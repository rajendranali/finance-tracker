import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction, fetchTransactions } from '../redux/action/action';
import styled from 'styled-components';
import { AiTwotoneDelete } from 'react-icons/ai';

const TableContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #eeedeb;
  color: #102c57;
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
  padding: 15px 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 13px;
`;

const DeleteButton = styled.button`
  padding: 7px;
  background-color: #ffb1b1;
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

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const DateFilter = styled.div`
  display: flex;
  align-items: center;
`;

const DateLabel = styled.label`
  margin-right: 10px;
`;

const DateInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
    dispatch(fetchTransactions());
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (!startDate || !endDate) {
      return true; // No date range selected, show all transactions
    }
    const transactionDate = new Date(transaction.date);
    return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
  }).slice().reverse(); // Ensure a new array is created to trigger re-render

  return (
    <TableContainer>
      <FilterContainer>
        <DateFilter>
          <DateLabel>Start Date:</DateLabel>
          <DateInput type="date" value={startDate} onChange={handleStartDateChange} />
        </DateFilter>
        <DateFilter>
          <DateLabel>End Date:</DateLabel>
          <DateInput type="date" value={endDate} onChange={handleEndDateChange} />
        </DateFilter>
      </FilterContainer>
      {loading && <Loading>Loading...</Loading>}
      {error && <Error>{error}</Error>}
      {!loading && !error && (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Category</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Time</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell style={{ color: transaction.type === 'income' ? 'green' : 'red' }}>
                  {transaction.type === 'income' ? `+ ₹${transaction.amount}` : `- ₹${transaction.amount}`}
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.time}</TableCell>
                <TableCell>
                  <DeleteButton onClick={() => handleDelete(transaction.id)}>
                    <AiTwotoneDelete />
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </TableContainer>
  );
};

export default TransactionList;
