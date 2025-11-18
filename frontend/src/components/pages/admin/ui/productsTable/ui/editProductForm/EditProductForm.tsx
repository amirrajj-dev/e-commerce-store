import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProducts } from "../../../../../../../hooks/useProduct";
import { useAppDispatch } from "../../../../../../../stores/hook";
import { closeModal } from "../../../../../../../stores/reducers/modal/modal.slice";
import { schema, type EditProductType } from "../../../../../../../validations/products/edit-product.validation";
import { toast } from "sonner";
import EditProductImageUpload from "./ui/EditProductImageUpload";
import EditProductNameField from "./ui/EditProductNameField";
import EditProductDescriptionField from "./ui/EditProductDescriptionField";
import EditProductPriceQuantityRow from "./ui/EditProductPriceQuantityRow";
import EditProductCategoryField from "./ui/EditProductCategoryField";
import EditProductActions from "./ui/EditProductActions";

interface EditProductFormProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
    image: string;
  };
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
  const { isUpdating, editProduct } = useProducts();
  const dispatch = useAppDispatch();
  const [previewImage, setPreviewImage] = useState<string>(product.image);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EditProductType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category as any,
      quantity: product.quantity,
    },
  });

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage instanceof File) {
      const objectUrl = URL.createObjectURL(watchImage);
      setPreviewImage(objectUrl);
      setSelectedFile(watchImage);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [watchImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const base64String = e.target?.result as string;
        setPreviewImage(base64String);
        setValue("image", file, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", undefined as any);
    setPreviewImage(product.image);
    setSelectedFile(null);
  };

  const onSubmit = async (data: EditProductType) => {
    try {
      const hasChanges =
        data.name !== product.name ||
        data.description !== product.description ||
        data.price !== product.price ||
        data.category !== product.category ||
        data.quantity !== product.quantity ||
        selectedFile !== null;

      if (!hasChanges) {
        toast.info("No changes detected");
        return;
      }
      
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("category", data.category);
      formData.append("quantity", data.quantity.toString());
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await editProduct(product.id, formData);
      dispatch(closeModal());
      toast.success("product updated sucesfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : (error as string) || "failed to update product"
      );
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const formProps = {
    register,
    errors,
    isUpdating,
    product,
  };

  const imageUploadProps = {
    ...formProps,
    previewImage,
    selectedFile,
    handleImageChange,
    handleRemoveImage,
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <EditProductImageUpload {...imageUploadProps} />
        <EditProductNameField {...formProps} />
        <EditProductDescriptionField {...formProps} />
        <EditProductPriceQuantityRow {...formProps} />
        <EditProductCategoryField {...formProps} />
        <EditProductActions 
          isUpdating={isUpdating} 
          onCancel={handleCancel} 
        />
      </form>
    </div>
  );
};

export default EditProductForm;