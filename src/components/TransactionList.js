// src/components/TransactionList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction, fetchTransactions } from '../redux/action/action';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const ListItemContent = styled.span`
  flex: 1;
  text-align: center;
  font-size: 16px;
`;

const DeleteButton = styled.button`
  padding: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #c82333;
    transform: scale(1.05);
  }
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #007bff;
`;

const Error = styled.div`
  text-align: center;
  font-size: 18px;
  color: #dc3545;
`;

const TransactionList = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
    dispatch(fetchTransactions());
  };

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <ListContainer>
      <List>
        {transactions?.map((transaction) => (
          <ListItem key={transaction.id} style={transaction.type=="expense"?{backgroundColor:"#f8d7da"}:{backgroundColor:"#d4edda"}}>

            <ListItemContent>{transaction.description}</ListItemContent>
            <ListItemContent>{transaction.category}</ListItemContent>
            <ListItemContent>{transaction.amount}</ListItemContent>
            <DeleteButton onClick={() => handleDelete(transaction.id)}>Delete</DeleteButton>
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

export default TransactionList;
