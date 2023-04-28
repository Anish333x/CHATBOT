import { expensAction } from "./expenseSlice";

export const fetchExpenseData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://expensetracker-9b633-default-rtdb.firebaseio.com/expense.json"
      );

      if (!response.ok) {
        throw new Error("could not fatch cart data");
      }
      const data = await response.json();
      console.log(data);
      return data;
    };
    try {
      const expenseData = await fetchData();
      dispatch(
        expensAction.replaceData({
          expenses: expenseData.expenses || [],
          totalexpenses: expenseData.totalexpenses,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendCartData = (data) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://expensetracker-9b633-default-rtdb.firebaseio.com/expense.json",
        {
          method: "PUT",
          body: JSON.stringify({
            expenses: data.expenses,
            totalexpenses: data.totalexpense,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("sending cart data failed.");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
