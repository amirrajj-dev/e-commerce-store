import { motion } from "framer-motion";
import type { FormFieldProps } from "../types/types";
import FormError from "../../../../../shared/FormError";
import CharacterCounter from "./CharacterCount";

const ProductNameField = ({ register, errors, watch }: FormFieldProps) => {
  const nameValue = watch("name") || "";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col gap-2"
    >
      <label htmlFor="name" className="label">
        <span className="label-text text-success font-semibold text-lg">
          Product Name
        </span>
      </label>
      <input
        type="text"
        id="name"
        {...register("name")}
        className={`input input-bordered w-full focus:outline-none transition-all ${
          errors.name
            ? "input-error"
            : "input-success focus:ring-2 focus:ring-success/20"
        }`}
        placeholder="Enter product name"
      />
      <FormError message={errors.name?.message} />
      {!errors.name && (
        <CharacterCounter currentLength={nameValue.length} maxLength={120} />
      )}
    </motion.div>
  );
};

export default ProductNameField;