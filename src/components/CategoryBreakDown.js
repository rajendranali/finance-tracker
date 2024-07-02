// src/components/CategoryBreakdown.js
import React from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";

const CategoryBreakdown = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const expenseCategories = transactions?.filter((t) => t.type === "expense")?.reduce((acc, curr) => {acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const data = {
    labels: Object?.keys(expenseCategories),
    datasets: [
      {
        data: Object?.values(expenseCategories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div>
      <h3>Expense Breakdown by Category</h3>
      <Pie data={data?data:{}} />
    </div>
  );
};

export default CategoryBreakdown;
