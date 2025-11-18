import React from "react";
import FormError from "../../../../../../../shared/FormError";
import type{ EditFormFieldProps } from "../types/types";

const EditProductNameField: React.FC<EditFormFieldProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-success font-semibold">Product Name</label>
      <input
        type="text"
        placeholder="Enter product name"
        className={`input input-success w-full outline-none ${
          errors.name ? "input-error" : ""
        }`}
        {...register("name")}
      />
      {errors.name && (
        <FormError message={errors.name.message} />
      )}
    </div>
  );
};

export default EditProductNameField;