import type{ UseFormRegister, FieldErrors } from "react-hook-form";
import type{ EditProductType } from "../../../../../../../../validations/products/edit-product.validation";

export interface EditProductFormProps {
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

export interface EditFormFieldProps {
  register: UseFormRegister<EditProductType>;
  errors: FieldErrors<EditProductType>;
  isUpdating: boolean;
  product: EditProductFormProps["product"];
}

export interface EditImageUploadProps extends EditFormFieldProps {
  previewImage: string;
  selectedFile: File | null;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
}

export interface EditActionsProps {
  isUpdating: boolean;
  onCancel: () => void;
}