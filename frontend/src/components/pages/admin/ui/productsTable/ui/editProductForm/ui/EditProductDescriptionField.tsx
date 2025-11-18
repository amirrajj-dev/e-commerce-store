import React from "react";
import FormError from "../../../../../../../shared/FormError";
import type{ EditFormFieldProps } from "../types/types";

const EditProductDescriptionField: React.FC<EditFormFieldProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-success font-semibold">Description</label>
      <textarea
        placeholder="Enter product description"
        className={`textarea textarea-success outline-none w-full h-24 ${
          errors.description ? "textarea-error" : ""
        }`}
        {...register("description")}
      />
      {errors.description && (
        <FormError message={errors.description.message} />
      )}
    </div>
  );
};

export default EditProductDescriptionField;