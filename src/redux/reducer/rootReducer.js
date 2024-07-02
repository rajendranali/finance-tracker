// src/reducers/transactionReducer.js

import {
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
} from "../actionType/actionType";

const initialState = {
  loading: false,
  transactions: [],
  error: null,
};

export const rootReducer = (state = initialState, action) => {
    console.log("Datat",action)
  switch (action.type) {
    case FETCH_TRANSACTIONS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TRANSACTIONS_SUCCESS:
      return { ...state, loading: false, transactions: action.payload };
    case FETCH_TRANSACTIONS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
