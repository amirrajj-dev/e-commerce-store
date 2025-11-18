import { motion } from "framer-motion";
import type{ ChartCardProps } from "../types/types";

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  icon: Icon,
  children,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: title === "Revenue Trend" ? -20 : title === "Daily Sales" ? 20 : 0, y: title === "Sales & Revenue Comparison" ? 20 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay }}
      className={`bg-base-200 rounded-xl p-6 shadow-lg border border-base-300 ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon size={20} className="text-success" />
        <h3 className="text-lg font-semibold text-base-content">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
};

export default ChartCard;