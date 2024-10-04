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

import { getRevenue } from "@/lib/rendelesKezeles";
import { useState, useEffect } from "react";

type Ertekesites = {
  date: string;
  totalAr: number;
};

export default function Diagram() {
  const [data, setData] = useState<Ertekesites[]>([]);

  const gettingData = async () => {
    const data = await getRevenue();
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    gettingData();
  }, []);

  const formatCurrency = (value: number) => `${value.toLocaleString()} Ft`;

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center mx-[9vw] border-2 rounded-lg mt-8 py-6">
        <h2 className=" text-2xl font-semibold">Értékesítési Adatok</h2>
        <div className="flex justify-center pt-10 font-semibold">
          Nincs értékesítési adat
        </div>
      </div>
    );
  }

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
            <Line dataKey="totalAr" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
