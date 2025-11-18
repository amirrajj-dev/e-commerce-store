import React from "react";
import { categories } from "../../../../../../../../data/data";
import FormError from "../../../../../../../shared/FormError";
import type{ EditFormFieldProps } from "../types/types";

const EditProductCategoryField: React.FC<EditFormFieldProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-success font-semibold">Category</label>
      <select
        className={`select select-success text-success outline-none w-full ${
          errors.category ? "select-error" : ""
        }`}
        {...register("category")}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.category && <FormError message={errors.category.message} />}
    </div>
  );
};

export default EditProductCategoryField;