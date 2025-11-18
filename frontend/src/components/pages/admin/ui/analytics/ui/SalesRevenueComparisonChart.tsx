import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface SalesRevenueComparisonChartProps {
  chartData: any[];
}

const SalesRevenueComparisonChart: React.FC<SalesRevenueComparisonChartProps> = ({ chartData }) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            opacity={0.3}
          />
          <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
          <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value, name) => {
              if (name === "revenue") return [`$${value}`, "Revenue"];
              return [value, "Sales"];
            }}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="sales"
            fill="#8B5CF6"
            name="Number of Sales"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="revenue"
            fill="#10B981"
            name="Revenue ($)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesRevenueComparisonChart;