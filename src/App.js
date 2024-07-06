// src/App.js
import React from "react";
import styled from "styled-components";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import CategoryBreakDown from "./components/CategoryBreakDown";

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
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
  max-width: auto;
  margin:70px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DashboardSection = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #131842;
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
          <LeftColumn>
            <Title>Personal Finance Tracker</Title>
            <CategoryBreakDown />
          </LeftColumn>
          <RightColumn>
            <DashboardSection>
              <Summary />
              <AddTransaction />
            </DashboardSection>

            <DashboardSection>
              <TransactionList />
            </DashboardSection>
          </RightColumn>
        </Content>
      </Container>
      <Footer>
        &copy; {new Date().getFullYear()} Personal Finance Tracker(Rajendra Nali). All rights
        reserved.
      </Footer>
    </>
  );
};

export default App;
