import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schema,
  type CreateProductType,
} from "../../../../../validations/products/create-product.validation";
import { useState } from "react";
import { useProducts } from "../../../../../hooks/useProduct";
import { toast } from "sonner";
import CreateProductHeader from "./ui/CreateProductHeader";
import ProductNameField from "./ui/ProductNameField";
import DescriptionField from "./ui/DescriptionField";
import PriceQuantityRow from "./ui/PriceQuantityRow";
import CategoryField from "./ui/CategoryField";
import ImageUploadField from "./ui/ImageUploadField";
import SubmitButton from "./ui/SubmitButton";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const CreateProductForm = ({
  currentTab,
}: {
  currentTab: "analytics" | "table" | "create";
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<CreateProductType>({
    resolver: zodResolver(schema),
  });

  const { addProduct, isCreating } = useProducts();

  const onSubmit = async (data: CreateProductType) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("quantity", data.quantity.toString());
      formData.append("category", data.category);
      if (data.image) {
        formData.append("image", data.image);
      }
      await addProduct(formData);
      toast.success("product created succesfully");
      reset();
      setImagePreview(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (error as string));
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const base64String = e.target?.result as string;
        setImagePreview(base64String);
        setValue("image", file, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("image", null as any, { shouldValidate: true });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const formProps = {
    register,
    errors,
    watch,
    isSubmitting,
    isCreating,
    imagePreview,
    handleImageChange,
    removeImage,
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={currentTab === 'create' ? "visible" : "hidden"}
      className=""
    >
      <motion.div variants={itemVariants}>
        <CreateProductHeader />
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div variants={itemVariants}>
          <ProductNameField {...formProps} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DescriptionField {...formProps} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PriceQuantityRow {...formProps} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CategoryField {...formProps} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ImageUploadField {...formProps} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SubmitButton {...formProps} />
        </motion.div>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
