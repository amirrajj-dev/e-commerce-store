import { motion } from "framer-motion";
import type{ FormFieldProps } from "../types/types";
import FormError from "../../../../../shared/FormError";
import CharacterCounter from "./CharacterCount";

const DescriptionField = ({ register, errors, watch }: FormFieldProps) => {
  const descriptionValue = watch("description") || "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col gap-2"
    >
      <label htmlFor="description" className="label">
        <span className="label-text text-success font-semibold text-lg">
          Description
        </span>
      </label>
      <textarea
        id="description"
        {...register("description")}
        rows={4}
        className={`textarea textarea-bordered w-full focus:outline-none resize-none transition-all ${
          errors.description
            ? "textarea-error"
            : "textarea-success focus:ring-2 focus:ring-success/20"
        }`}
        placeholder="Enter product description"
      />
      <div className="flex justify-between items-center mt-1">
        <FormError message={errors.description?.message} />
        <CharacterCounter currentLength={descriptionValue.length} maxLength={500} />
      </div>
    </motion.div>
  );
};

export default DescriptionField;