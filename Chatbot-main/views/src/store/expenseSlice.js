import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    totalexpense: 0,
    changed: false,
  },
  reducers: {
    replaceData(state, action) {
      state.expenses = action.payload.expenses;
      state.totalexpense = action.payload.totalexpenses;
      state.changed = true;
    },
    addExpense(state, action) {
      console.log(action.payload.title);
      state.expenses.push({
        title: action.payload.title,
        id: action.payload.id,
        amount: action.payload.amount,
        date: action.payload.date,
      });
      state.totalexpense += +action.payload.amount;
      state.changed = true;
    },
  },
});

export const expensAction = expenseSlice.actions;

export default expenseSlice;
