import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction, fetchTransactions } from '../redux/action/action';
import styled from 'styled-components';

const TableContainer = styled.div`
  padding: 2px 20px 20px 20px; /* Remove top padding */
  background-color: #f8f9fa;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  height: 500px; /* Set a fixed height for the table container */
  overflow-y: auto; /* Enable vertical scrolling */
  position: relative; /* Ensure the header is positioned relative to this container */
  
  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  @media (max-width: 768px) {
    padding: 0 15px 15px 15px; /* Remove top padding */
    max-width: 100%;
    overflow-x: auto;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #EEEDEB;
  color: #102C57;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

const DeleteButton = styled.button`
  padding: 7px;
  background-color: #FFB1B1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
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
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {transactions?.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell style={transaction.type === "income" ? { color: "green" } : { color: "red" }}>
                {transaction.type === "income" ? "+ ₹" : "- ₹"}{transaction.amount}
              </TableCell>
              <TableCell>
                <DeleteButton onClick={() => handleDelete(transaction.id)}>x</DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;
