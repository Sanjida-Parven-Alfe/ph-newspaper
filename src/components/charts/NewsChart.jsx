"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const NewsChart = ({ data }) => {
  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-[320px] bg-base-200 p-4 rounded-xl shadow-sm border border-base-300">
      <h3 className="text-sm font-bold text-base-content/70 uppercase tracking-wider mb-4 text-center">
        News Statistics by Category
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-base-content/10" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11, fill: 'currentColor' }} 
            axisLine={false} 
            tickLine={false}
            className="text-base-content/60"
          />
          <YAxis 
            allowDecimals={false} 
            tick={{ fontSize: 11, fill: 'currentColor' }} 
            axisLine={false} 
            tickLine={false}
            className="text-base-content/60"
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            contentStyle={{ 
              backgroundColor: 'var(--fallback-b1,oklch(var(--b1)/1))', 
              borderColor: 'var(--fallback-bc,oklch(var(--bc)/0.1))',
              color: 'var(--fallback-bc,oklch(var(--bc)/1))',
              borderRadius: '8px'
            }}
            itemStyle={{ color: 'var(--fallback-bc,oklch(var(--bc)/1))' }}
          />
          <Bar dataKey="count" name="Articles" radius={[4, 4, 0, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewsChart;