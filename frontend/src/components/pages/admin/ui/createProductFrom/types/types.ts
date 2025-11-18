import type{ UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type{ CreateProductType } from "../../../../../../validations/products/create-product.validation";

export interface FormFieldProps {
  register: UseFormRegister<CreateProductType>;
  errors: FieldErrors<CreateProductType>;
  watch: UseFormWatch<CreateProductType>;
  isSubmitting: boolean;
  isCreating: boolean;
}

export interface ImageUploadFieldProps extends FormFieldProps {
  imagePreview: string | null;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
}