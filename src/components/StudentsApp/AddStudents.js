import React, { useState, useContext } from "react";
import { GlobalContext } from "../Context/Global State";

export const AddStudents = () => {
  const [text1, setText1] = useState("");
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text1,
    };
    if (text1 === null) {
      alert("Please Enter Correct Name!");
    } else {
      addTransaction(newTransaction);
      setText1("");
      alert("Student Added Successfully");
    }
  };
  return (
    <>
      <h3>Add new Student</h3>
      <form onSubmit={onSubmit} className="font2">
        <div className="form-control">
          <label htmlFor="text1" className="font">
            <br />
          </label>
          <input
            type="text"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter your Student's Name......"
            className="font1"
          />
        </div>
        <div className="form-control"></div>
        <button className="btn">Add new Student</button>
      </form>
    </>
  );
};
