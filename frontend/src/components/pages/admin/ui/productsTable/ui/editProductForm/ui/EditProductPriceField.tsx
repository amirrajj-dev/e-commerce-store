import React from "react";
import FormError from "../../../../../../../shared/FormError";
import type{ EditFormFieldProps } from "../types/types";

const EditProductPriceField: React.FC<EditFormFieldProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-success font-semibold">Price ($)</label>
      <input
        type="number"
        placeholder="0.00"
        step="0.01"
        className={`input input-success w-full outline-none ${
          errors.price ? "input-error" : ""
        }`}
        {...register("price", { valueAsNumber: true })}
      />
      {errors.price && <FormError message={errors.price.message} />}
    </div>
  );
};

export default EditProductPriceField;