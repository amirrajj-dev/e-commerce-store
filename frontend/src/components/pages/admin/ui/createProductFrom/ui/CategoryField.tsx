import { motion } from "framer-motion";
import { categories } from "../../../../../../data/data";
import type { FormFieldProps } from "../types/types";
import FormError from "../../../../../shared/FormError";

const CategoryField = ({ register, errors }: FormFieldProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col gap-2"
    >
      <label htmlFor="category" className="label">
        <span className="label-text text-success font-semibold text-lg">
          Category
        </span>
      </label>
      <select
        id="category"
        {...register("category")}
        className={`select select-bordered w-full focus:outline-none transition-all ${
          errors.category
            ? "select-error"
            : "select-success focus:ring-2 focus:ring-success/20"
        }`}
      >
        {categories.map((c) => (
          <option value={c.name} key={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <FormError message={errors.category?.message} />
    </motion.div>
  );
};

export default CategoryField;