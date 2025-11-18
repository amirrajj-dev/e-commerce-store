import { motion } from "framer-motion";
import type { FormFieldProps } from "../types/types";
import PriceField from "./PriceField";
import QuantityField from "./QuantityField";

const PriceQuantityRow = ({ register, errors }: FormFieldProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <PriceField register={register} errors={errors} />
      <QuantityField register={register} errors={errors} />
    </motion.div>
  );
};

export default PriceQuantityRow;