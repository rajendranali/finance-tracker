// src/App.js
import React from 'react';
import styled from 'styled-components';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
// import CategoryBreakdown from './components/CategoryBreakDown'; // Uncomment when ready

const Container = styled.div`
  background-color: #f0f0f0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardSection = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;

  &:nth-child(odd) {
    background-color: #f8f9fa;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const Footer = styled.footer`
  margin-top: 30px;
  text-align: center;
  color: #666;
`;

const App = () => {
  return (
    <>
  <Container>
      <Content>
        <DashboardSection>
          <Title>Personal Finance Tracker</Title>
          <AddTransaction />
          <TransactionList />
        </DashboardSection>
        <DashboardSection>
          <Summary />
          {/* <CategoryBreakdown /> */}
        </DashboardSection>
      </Content>
    
    </Container>
  
      <Footer>
        &copy; {new Date().getFullYear()} Personal Finance Tracker. All rights reserved.
      </Footer>
    </>)
  
}

export default App;
