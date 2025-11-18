import React from "react";
import FormError from "../../../../../../../shared/FormError";
import type{ EditFormFieldProps } from "../types/types";

const EditProductQuantityField: React.FC<EditFormFieldProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-success font-semibold">Quantity</label>
      <input
        type="number"
        placeholder="0"
        className={`input input-success w-full outline-none ${
          errors.quantity ? "input-error" : ""
        }`}
        {...register("quantity", { valueAsNumber: true })}
      />
      {errors.quantity && <FormError message={errors.quantity.message} />}
    </div>
  );
};

export default EditProductQuantityField;