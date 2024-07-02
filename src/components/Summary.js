// src/components/Summary.js
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
  min-width: 150px;

  @media (max-width: 768px) {
    margin: 10px 0;
    min-width: 200px;
  }
`;

const SummaryLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const SummaryValue = styled.div`
  font-size: 24px;
  color: #007bff;
  margin-top: 10px;
`;

const Summary = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const income = transactions?.filter((t) => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions?.filter((t) => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expenses;

  return (
    <SummaryContainer>
      <SummaryItem>
        <SummaryLabel>Total Income</SummaryLabel>
        <SummaryValue>{income}</SummaryValue>
      </SummaryItem>
      <SummaryItem>
        <SummaryLabel>Total Expenses</SummaryLabel>
        <SummaryValue>{expenses}</SummaryValue>
      </SummaryItem>
      <SummaryItem>
        <SummaryLabel>Balance</SummaryLabel>
        <SummaryValue>{balance}</SummaryValue>
      </SummaryItem>
    </SummaryContainer>
  );
};

export default Summary;
