import { motion } from "framer-motion";
import type{ PerformanceSummaryProps } from "../types/types";

const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({ 
  data, 
  chartData 
}) => {
  const averageDailyRevenue = Math.round(
    data.analyticsData.totalRevenue / Math.max(chartData.length, 1)
  );

  const bestPerformingDay = chartData.reduce(
    (best, current) =>
      current.revenue > best.revenue ? current : best,
    { revenue: 0, date: "None" }
  ).date;

  const conversionRate = data.analyticsData.totalUsers > 0
    ? Math.round(
        (data.analyticsData.totalSales / data.analyticsData.totalUsers) * 100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-300"
    >
      <h3 className="text-lg font-semibold text-base-content mb-4">
        Performance Summary
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="text-center p-4 bg-base-200 rounded-lg">
          <p className="text-base-content/70">Average Daily Revenue</p>
          <p className="text-xl font-bold text-success">${averageDailyRevenue}</p>
        </div>
        <div className="text-center p-4 bg-base-200 rounded-lg">
          <p className="text-base-content/70">Best Performing Day</p>
          <p className="text-xl font-bold text-success">{bestPerformingDay}</p>
        </div>
        <div className="text-center p-4 bg-base-200 rounded-lg">
          <p className="text-base-content/70">Conversion Rate</p>
          <p className="text-xl font-bold text-success">{conversionRate}%</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceSummary;