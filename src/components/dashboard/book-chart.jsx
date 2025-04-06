"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Book A", total: 100, available: 80 },
  { name: "Book B", total: 150, available: 120 },
  { name: "Book C", total: 200, available: 150 },
  { name: "Book D", total: 75, available: 60 },
  { name: "Book E", total: 125, available: 100 },
];

export function BookChart() {
  return (
    <div className="h-[300px] sm:h-[400px] bg-white pl-2 gap-2  shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4 ">Book Inventory</h3>
      <div className="flex justify-center mt-4 space-x-4 mb-2">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue-600 rounded-full inline-block mr-2"></span>
          <span className="text-sm text-gray-600">Total Books</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-green-500 rounded-full inline-block mr-2"></span>
          <span className="text-sm text-gray-600">Available Books</span>
        </div>
      </div>
      <ResponsiveContainer width="80%" height="80%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Bar dataKey="total" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="available" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      {/* Color Legend */}
      
    </div>
  );
}
