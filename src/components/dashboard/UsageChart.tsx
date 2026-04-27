import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UsageChart = ({ data }: any) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold">Monthly Usage</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <Tooltip />
          <Line type="monotone" dataKey="used" stroke="#22c55e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageChart;