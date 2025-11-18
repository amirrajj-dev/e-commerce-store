import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { useProducts } from "../../../hooks/useProduct";
import { ShoppingCart, Loader2, TriangleAlert } from "lucide-react";
import { useCart } from "../../../hooks/useCart";
import type { ProductI } from "../../../types/interfaces/product.interface";
import { toast } from "sonner";
import { useAppSelector } from "../../../stores/hook";
import Header from "./ui/Header";
import Product from "../../common/Product/Product";

const CategoryProducts = () => {
  const { category } = useParams();
  const {
    fetchProductsByCategory,
    isLoading,
    productsByCategory,
    error: productError,
  } = useProducts();

  const { addToCart, isAdding, isLoading: isLoadingCart } = useCart();

  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    fetchProductsByCategory(category as string);
  }, [category, fetchProductsByCategory]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const addProductToCart = async (productId: string, product: ProductI) => {
    try {
      if (isAuthenticated) {
        await addToCart(productId, product);
        toast.success("product added to the cart successfully");
      } else {
        toast.error("you should login first");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "failed to add poduct to the cart"
      );
    }
  };

  const categoryProducts = productsByCategory[category as string] || [];

  if (productError) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20 bg-base-100 mt-4 rounded-md">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <TriangleAlert size={32} className="text-error" />
            </div>
            <h3 className="text-2xl font-semibold text-error mb-4">
              Failed to Load Products
            </h3>
            <p className="text-base-content/70 mb-6">{productError}</p>
            <button
              onClick={() => fetchProductsByCategory(category as string)}
              className="btn btn-error"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto  py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <Header category={category as string} />

      {/* Loading State */}
      {isLoading || isLoadingCart ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-success"
          >
            <Loader2 size={48} />
          </motion.div>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          {categoryProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              {categoryProducts.map((product, index) => (
                <Product
                  key={product.id}
                  addToCart={addProductToCart}
                  index={index}
                  isAdding={isAdding}
                  product={product}
                />
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart size={40} className="text-base-content/30" />
                </div>
                <h3 className="text-2xl font-semibold text-base-content mb-4">
                  No Products Found
                </h3>
                <p className="text-base-content/70 mb-6">
                  We couldn't find any products in the {category} category.
                </p>
                <Link to={"/"} className="btn btn-success">
                  Browse All Categories
                </Link>
              </div>
            </motion.div>
          )}

          {/* Results Count */}
          {categoryProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <p className="text-base-content/60">
                Showing {categoryProducts.length} product
                {categoryProducts.length !== 1 ? "s" : ""} in {category}
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryProducts;
