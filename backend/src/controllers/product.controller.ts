import type { NextFunction, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { ApiResponseHelper } from '../helpers/api.helper';
import { redis } from 'bun';
import type { UpdateProductDto, CreateProductDto } from '../types/dtos/product.dto';
import cloudinary from '../utils/cloudinary';
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger';
import { updateFeaturedProductsCache } from '../helpers/update-featured-products-cache';

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res
      .status(200)
      .json(ApiResponseHelper.success('Products fetched successfully', products, req.path));
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let featuredProducts: any = await redis.get('featured_products');
    if (featuredProducts) {
      featuredProducts = JSON.parse(featuredProducts);
    } else {
      featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        orderBy: { createdAt: 'desc' },
      });
      await redis.set(
        'featured_products',
        JSON.stringify(featuredProducts),
        'EX',
        // 12 hours
        43200,
      );
    }
    return res
      .status(200)
      .json(
        ApiResponseHelper.success(
          'Featured products fetched successfully',
          featuredProducts,
          req.path,
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const createProduct = [
  body('name')
    .trim()
    .isLength({ min: 4, max: 120 })
    .withMessage('Name must be between 4 and 120 characters'),

  body('description')
    .trim()
    .isLength({ min: 4, max: 500 })
    .withMessage('Description must be between 4 and 500 characters'),

  body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),

  body('category')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Category must be between 3 and 50 characters'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('image')
    .optional()
    .isString()
    .matches(/^data:image\/(jpeg|png|jpg|webp);base64,/)
    .withMessage('Image must be a valid base64-encoded image (jpeg, png, jpg, webp)'),
  async (req: Request<{}, {}, CreateProductDto>, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error(`Validation errors: ${JSON.stringify(errors.array())}`);
        return res
          .status(400)
          .json(
            ApiResponseHelper.error(
              'VALIDATION_ERROR',
              JSON.parse(JSON.stringify(errors.array())),
              req.path,
            ),
          );
      }
      const { name, image, category, description, price, quantity } = req.body;
      let cloudinaryResponse = null;
      if (image) {
        try {
          cloudinaryResponse = await cloudinary.uploader.upload(image, {
            folder: 'e-commerce-products',
          });
        } catch (error) {
          return res.status(500).json(ApiResponseHelper.internalError('failed to upload image'));
        }
      }
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          category,
          quantity,
          image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : '',
        },
      });
      return res
        .status(201)
        .json(ApiResponseHelper.created('Product Created Succesfully', product, req.path));
    } catch (error) {
      next(error);
    }
  },
];

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      return res.status(404).json(ApiResponseHelper.notFound('Product Not Found'));
    }
    if (product.image) {
      const publicId = product.image.split('/').pop()?.split('.')[0];
      try {
        await cloudinary.uploader.destroy(publicId as string);
        logger.info('product image delete succesfully');
      } catch (error) {
        return res
          .status(500)
          .json(ApiResponseHelper.internalError('failed to delete product image'));
      }
    }
    if (product.isFeatured) {
      await updateFeaturedProductsCache();
    }
    await prisma.product.delete({
      where: {
        id,
      },
    });
    return res.status(200).json(ApiResponseHelper.success('Product Delete Successully'));
  } catch (error) {
    next(error);
  }
};

export const getRecommendedProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const randomProducts = await prisma.$queryRaw`
  SELECT * FROM "Product"
  ORDER BY RANDOM()
  LIMIT 3;
`;
    return res
      .status(200)
      .json(
        ApiResponseHelper.success(
          'Recomended Products Fetched Successfully',
          randomProducts,
          req.path,
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (
  req: Request<{ category: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { category } = req.params;
    const products = await prisma.product.findMany({
      where: {
        category,
      },
    });
    return res
      .status(200)
      .json(ApiResponseHelper.success('Products Fetched Successfully', products, req.path));
  } catch (error) {
    next(error);
  }
};

export const toggleFeaturedStatus = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      return res.status(200).json(ApiResponseHelper.notFound('product not found', req.path));
    }
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        isFeatured: product.isFeatured ? false : true,
      },
    });
    await updateFeaturedProductsCache();
    return res
      .status(200)
      .json(ApiResponseHelper.success('product featured status updated succesfully'));
  } catch (error) {
    next(error);
  }
};

export const updateProduct = [
  body('name')
    .trim()
    .isLength({ min: 4, max: 120 })
    .withMessage('Name must be between 4 and 120 characters'),

  body('description')
    .trim()
    .isLength({ min: 4, max: 500 })
    .withMessage('Description must be between 4 and 500 characters'),

  body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),

  body('category')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Category must be between 3 and 50 characters'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('image')
    .optional()
    .isString()
    .matches(/^data:image\/(jpeg|png|jpg|webp);base64,/)
    .withMessage('Image must be a valid base64-encoded image (jpeg, png, jpg, webp)'),
  async (req: Request<{ id: string }, {}, UpdateProductDto>, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error(`Validation errors: ${JSON.stringify(errors.array())}`);
        return res
          .status(400)
          .json(
            ApiResponseHelper.error(
              'VALIDATION_ERROR',
              JSON.parse(JSON.stringify(errors.array())),
              req.path,
            ),
          );
      }
      const { id } = req.params;
      const { name, description, price, category, image, quantity } = req.body;
      const product = await prisma.product.findUnique({
        where: {
          id,
        },
      });
      if (!product) {
        return res.status(404).json(ApiResponseHelper.notFound('Product Not Found', req.path));
      }
      let cloudinaryResponse = null;
      if (product.image && image) {
        try {
          const publicId = product.image.split('/').pop()?.split('.')[0];
          await cloudinary.uploader.destroy(publicId as string);
          logger.info('old product image deleted succesfully');
        } catch (error) {
          return res
            .status(500)
            .json(ApiResponseHelper.internalError('failed to delete old product image', req.path));
        }
      }
      if (image) {
        try {
          cloudinaryResponse = await cloudinary.uploader.upload(image, {
            folder: 'e-commerce-products',
          });
        } catch (error) {
          return res
            .status(500)
            .json(ApiResponseHelper.internalError('failed to upload new product image', req.path));
        }
      }
      const updatedProduct = await prisma.product.update({
        where: {
          id,
        },
        data: {
          name: name ?? product.name,
          description: description ?? product.description,
          price: price ?? product.price,
          category: category ?? product.category,
          quantity: quantity ?? product.quantity,
          image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : product?.image,
        },
      });
      if (product.isFeatured) {
        await updateFeaturedProductsCache();
      }
      return res
        .status(200)
        .json(ApiResponseHelper.success('Product Updated Successfully', updatedProduct, req.path));
    } catch (error) {
      next(error);
    }
  },
];
