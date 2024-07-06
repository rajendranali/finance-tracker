// src/components/Summary.js
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CiSaveDown2, CiSaveUp2, CiWallet } from 'react-icons/ci';

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  margin: 0 10px;
  min-width: 150px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  @media (max-width: 768px) {
    margin: 10px 0;
    min-width: 200px;
  }
`;

const SummaryLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
  color:#102C57;
`;

const SummaryValue = styled.div`
  font-size: 24px;
  color: #007bff;
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  margin-right: 10px;
`;

const RupeeSymbol = styled.span`
  color: gray;
  margin-right: 5px;
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
        <SummaryValue>
          <IconContainer style={{ color: 'green',fontWeight:"bolder" }}>
            <CiSaveUp2  style={{ color: 'green',fontWeight:"bolder" }}/>
          </IconContainer>
          <RupeeSymbol style={{ color: 'green'}}>₹</RupeeSymbol>{income}
        </SummaryValue>
      </SummaryItem>
      <SummaryItem>
        <SummaryLabel>Total Expenses</SummaryLabel>
        <SummaryValue>
          <IconContainer style={{ color: 'red',fontWeight:"bolder"  }}>
            <CiSaveDown2  style={{ color: 'red',fontWeight:"bolder"  }} />
          </IconContainer>
          <RupeeSymbol  style={{ color: 'red', }}>₹</RupeeSymbol>{expenses}
        </SummaryValue>
      </SummaryItem>
      <SummaryItem>
        <SummaryLabel>Balance</SummaryLabel>
        <SummaryValue style={balance<0?{color:"red"}:{color:"green"}}>

          <IconContainer style={{ color: 'blue' }}>
          <CiWallet />
          </IconContainer>
          <RupeeSymbol>₹</RupeeSymbol>{balance}
        </SummaryValue>
      </SummaryItem>
    </SummaryContainer>
  );
};

export default Summary;
