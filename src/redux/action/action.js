// src/actions/transactionActions.js
import axios from "axios";
import {
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
} from "../actionType/actionType";

export const fetchTransactions = () => async (dispatch) => {
  dispatch({ type: FETCH_TRANSACTIONS_REQUEST });
  try {
    const response = await axios.get("http://localhost:5000/transactions");
   
    dispatch({ type: FETCH_TRANSACTIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TRANSACTIONS_FAILURE, error: error.message });
  }
};

export const addTransaction = (transaction) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/transactions", transaction);
    dispatch({ type: ADD_TRANSACTION, payload: response.data });
  } catch (error) {
    console.error("Error adding transaction", error);
  }
};

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/transactions/${id}`);
    dispatch({ type: DELETE_TRANSACTION, payload: id });
  } catch (error) {
    console.error("Error deleting transaction", error);
  }
};
