import { useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 9, category: "Utilities" },
    { id: 3, description: "ccc", amount: 8, category: "Utilities" },
  ]);

  return (
    <ExpenseList
      expenses={expenses}
      onDelete={(id) =>
        setExpenses(expenses.filter((expense) => expense.id !== id))
      }
    />
  );
}

export default App;
