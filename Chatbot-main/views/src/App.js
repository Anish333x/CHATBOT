import React, { useEffect, useState } from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense.js/NewExpense';
import { useDispatch, useSelector } from 'react-redux';
import { expensAction } from './store/expenseSlice';
import { fetchExpenseData, sendCartData } from './store/expenseAction';

// import "./App.css";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const App = () => {
  const dispatch = useDispatch();
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const expenseData = useSelector((state) => state.expense);
  useEffect(() => {
    dispatch(fetchExpenseData());
  }, [dispatch]);

  useEffect(() => {
    if (expenseData.changed) {
      dispatch(sendCartData(expenseData));
    }
  }, [expenseData, dispatch]);

  const addExpenseHandler = (expense) => {
    dispatch(expensAction.addExpense(expense));
    console.log(expenseData.expenses, expenses);
    setExpenses((prevExpense) => {
      return [expense, ...prevExpense];
    });
  };

  // Old way to write React Work same as below code
  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h2", {}, "Let's Start"),
  //   React.createElement(Expenses, { items: expenses })
  // );

  // New way to write above code with JSX
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenseData.expenses} />
    </div>
  );
};

export default App;
