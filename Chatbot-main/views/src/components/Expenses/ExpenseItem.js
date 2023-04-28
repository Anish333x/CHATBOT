import React from "react";

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card.js";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const date = new Date(+props.date);
  return (
    <Card className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">&#8377; {props.amount}</div>
      </div>
    </Card>
  );
};

export default ExpenseItem;
