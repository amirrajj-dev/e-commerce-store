import { motion } from "framer-motion";
import type { StatCardProps } from "../types/types";

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-linear-to-br brightness-160 from-success-content/90 via-base-100 to-accent-content/80 rounded-xl p-6 shadow-lg border border-base-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base-content/70 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-base-content mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full font-bold ${bgColor}`}>
          <Icon size={24} className={color} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;