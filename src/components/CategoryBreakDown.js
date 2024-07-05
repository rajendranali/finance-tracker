import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import chroma from "chroma-js"; // Import chroma-js
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import styled from "styled-components";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 20px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #fff;
`;

const Message = styled.p`
  color: #666;
`;

const CategoryBreakDown = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [chartType, setChartType] = useState("pie"); // State to manage the selected chart type
  const [dataType, setDataType] = useState("expense"); // State to manage the selected data type

  useEffect(() => {
    try {
      const expenses = transactions
        ?.filter((t) => t.type === "expense")
        ?.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
          return acc;
        }, {});

      const incomes = transactions
        ?.filter((t) => t.type === "income")
        ?.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
          return acc;
        }, {});

      const expenseList = Object.keys(expenses || {}).map((key) => ({
        name: key,
        value: expenses[key],
      }));

      const incomeList = Object.keys(incomes || {}).map((key) => ({
        name: key,
        value: incomes[key],
      }));

      // Generate dynamic colors using chroma-js
      const colorList = chroma
        .scale(["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"])
        .mode("lch")
        .colors(expenseList.length + incomeList.length);

      setExpenseCategories(expenseList);
      setIncomeCategories(incomeList);
      setColors(colorList);
    } catch (error) {
      console.error("Error processing transactions:", error);
    }
  }, [transactions]);

  const chartData = useMemo(() => {
    if (dataType === "expense") {
      return expenseCategories;
    } else if (dataType === "income") {
      return incomeCategories;
    } else {
      return expenseCategories.map((expense) => {
        const income = incomeCategories.find((income) => income.name === expense.name) || { value: 0 };
        return {
          name: expense.name,
          expense: expense.value,
          income: income.value,
        };
      });
    }
  }, [dataType, expenseCategories, incomeCategories]);

  return (
    <Container>
      <Title>
        {dataType === "expense" ? "Expense Breakdown by Category" : dataType === "income" ? "Income Breakdown by Category" : "Expense vs Income"}
      </Title>
      <Controls>
        <Select value={dataType} onChange={(e) => setDataType(e.target.value)}>
          <option value="expense">Expense Breakdown</option>
          <option value="income">Income Breakdown</option>
          <option value="comparison">Expense vs Income</option>
        </Select>
        <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
        </Select>
      </Controls>
      {chartData.length > 0 ? (
        chartType === "pie" ? (
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey={dataType === "comparison" ? "expense" : "value"}
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
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataType === "comparison" ? (
              <>
                <Bar dataKey="expense" fill="#FF6384" />
                <Bar dataKey="income" fill="#36A2EB" />
              </>
            ) : (
              <Bar dataKey="value" fill="#8884d8">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            )}
          </BarChart>
        )
      ) : (
        <Message>
          No {dataType} data available
        </Message>
      )}
    </Container>
  );
};

const CategoryBreakDownWithBoundary = () => (
  <ErrorBoundary>
    <CategoryBreakDown />
  </ErrorBoundary>
);

export default CategoryBreakDownWithBoundary;
