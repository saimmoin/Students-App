import React, { useContext } from "react";
import { GlobalContext } from "../Context/Global State";

export const Students1 = ({ transaction }) => {
  const { deleteTransaction, transactions } = useContext(GlobalContext);

  function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  return (
    <li className="font3">
      {transaction.text1}
      <button
        className="delete-btn"
        onClick={() =>
          window.confirm("Are you sure you want to delete a student ?") &&
          deleteTransaction(transaction.id) &&
          updateLocalStorage()
        }
      >
        x
      </button>
    </li>
  );
};
