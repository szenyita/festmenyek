"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Diagram() {
  const data = [
    { date: "2023-09-01", sales: 100000 },
    { date: "2023-09-02", sales: 15000 },
    { date: "2023-09-03", sales: 800000 },
    { date: "2023-09-04", sales: 20000 },
    { date: "2023-09-05", sales: 1300 },
  ];

  const formatCurrency = (value: number) => `${value.toLocaleString()} Ft`;

  return (
    <div className="flex flex-col items-center mx-[9vw] border-2 rounded-lg mt-8 py-6">
      <h2 className="mb-8 text-2xl font-semibold">Értékesítési Adatok</h2>
      <div className="flex w-[80vw] h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={formatCurrency} />
            <Line dataKey="sales" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
