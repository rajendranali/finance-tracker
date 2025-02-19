import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, fetchTransactions } from '../redux/action/action';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
`;

const Form = styled.form`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 25px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.02);
  }

  &:active {
    background-color: #004085;
    transform: scale(1);
  }
`;

const ModalButton = styled.button`
  background-color: #EEEDEB;
  color: gray;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.02);
    color: white;
  }

  &:active {
    background-color: #004085;
    transform: scale(1);
  }
`;

const AddTransaction = () => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.transactions);

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { 
      type, 
      amount: parseFloat(amount), 
      category, 
      description, 
      date, 
      time: formatTime(time) 
    };

    dispatch(addTransaction(newTransaction))
      .then(() => {
        dispatch(fetchTransactions());
        toast.success('Transaction added successfully!');
        setShowModal(false); // Close modal after submission
        setType('income');
        setAmount('');
        setCategory('');
        setDescription('');
        setDate('');
        setTime('');
      })
      .catch(() => {
        toast.error('Failed to add transaction');
      });
  };

  return (
    <>
      <ModalButton onClick={() => setShowModal(true)}>Add Transaction💳</ModalButton>
      {showModal && (
        <FormContainer onClick={() => setShowModal(false)}>
          <Form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <Label>Type:</Label>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Amount:</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Category:</Label>
              <Input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Description:</Label>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Date:</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Time:</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit">Add Transaction</Button>
          </Form>
        </FormContainer>
      )}
      <ToastContainer />
    </>
  );
};

export default AddTransaction;
