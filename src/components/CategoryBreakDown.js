import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import chroma from 'chroma-js'; // Import chroma-js

const CategoryBreakDown = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const expenseCategories = transactions?.filter((t) => t.type === "expense")?.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // Generate dynamic colors using chroma-js
  const colors = chroma.scale(['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']).mode('lch').colors(Object.keys(expenseCategories || {}).length);

  const data = {
    labels: Object.keys(expenseCategories || {}),
    datasets: [
      {
        data: Object.values(expenseCategories || {}),
        backgroundColor: colors, // Use the dynamically generated colors
      },
    ],
  };

  // State to manage chart key
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    // Increment key to force chart re-render when data changes
    setChartKey(prevKey => prevKey + 1);
  }, [transactions]);

  return (
    <div>
      <h3 style={{ textAlign: 'center', color: '#666' }}>Expense Breakdown by Category</h3>
      <Pie key={chartKey} data={data} />
    </div>
  );
};

export default CategoryBreakDown;
