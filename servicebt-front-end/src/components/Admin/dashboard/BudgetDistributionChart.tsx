import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BudgetDistributionChart = ({ budgetData }) => {
  const formatMoney = (amount) => {
    return `Nu. ${amount.toLocaleString()}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Budget Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis 
                dataKey="name" 
                label={{ value: 'Budget Range (Nu.)', position: 'bottom' }}
              />
              <YAxis 
                label={{ 
                  value: 'Number of Jobs', 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'count') return [`${value} jobs`, 'Count'];
                  return [formatMoney(value), 'Total Budget'];
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" name="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {budgetData.map((item, index) => (
            <div 
              key={index}
              className="rounded-lg bg-gray-50 p-3"
            >
              <div className="text-sm text-gray-500">Range: {item.name}</div>
              <div className="mt-1 font-semibold text-blue-600">
                {item.count} jobs
              </div>
              <div className="text-sm text-gray-600">
                Total: {formatMoney(item.totalBudget)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetDistributionChart;