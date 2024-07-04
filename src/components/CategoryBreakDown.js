import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import chroma from "chroma-js"; // Import chroma-js
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const CategoryBreakDown = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const [expenseCategories, setExpenseCategories] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    try {
      const categories = transactions
        ?.filter((t) => t.type === "expense")
        ?.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
          return acc;
        }, {});

      const categoryList = Object.keys(categories || {}).map((key) => ({
        name: key,
        value: categories[key],
      }));

      // Generate dynamic colors using chroma-js
      const colorList = chroma
        .scale(["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"])
        .mode("lch")
        .colors(categoryList.length);

      setExpenseCategories(categoryList);
      setColors(colorList);
    } catch (error) {
      console.error("Error processing transactions:", error);
    }
  }, [transactions]);

  const chartData = useMemo(() => expenseCategories, [expenseCategories]);

  return (
    <div>
      <h3 style={{ textAlign: "center", color: "#666" }}>
        Expense Breakdown by Category
      </h3>
      {chartData.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>
          No expense data available
        </p>
      )}
    </div>
  );
};

const CategoryBreakDownWithBoundary = () => (
  <ErrorBoundary>
    <CategoryBreakDown />
  </ErrorBoundary>
);

export default CategoryBreakDownWithBoundary;
