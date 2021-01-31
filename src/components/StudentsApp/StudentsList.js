import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { Students1 } from "./Students1";

export const StudentsList = () => {
  const { transactions } = useContext(GlobalContext);
  updateLocalStorage();

  function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  return (
    <>
      <h3>Students</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Friends key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
