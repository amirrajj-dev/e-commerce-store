import { TrendingUp, BarChart3, Calendar } from "lucide-react";
import type { ChartsGridProps } from "../types/types";
import ChartCard from "./ChartCard";
import RevenueTrendChart from "./RevenueTrendChat";
import DailySalesChart from "./DailySalesChart";
import SalesRevenueComparisonChart from "./SalesRevenueComparisonChart";

const ChartsGrid: React.FC<ChartsGridProps> = ({ chartData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard
        title="Revenue Trend"
        icon={TrendingUp}
        delay={0.2}
      >
        <RevenueTrendChart chartData={chartData} />
      </ChartCard>

      <ChartCard
        title="Daily Sales"
        icon={BarChart3}
        delay={0.3}
      >
        <DailySalesChart chartData={chartData} />
      </ChartCard>

      <ChartCard
        title="Sales & Revenue Comparison"
        icon={Calendar}
        delay={0.4}
        className="lg:col-span-2"
      >
        <SalesRevenueComparisonChart chartData={chartData} />
      </ChartCard>
    </div>
  );
};

export default ChartsGrid;