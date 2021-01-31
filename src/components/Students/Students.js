import React from "react";
import { AddStudents } from "../StudentsApp/AddStudents";

export const Students = () => {
  return (
    <div>
      <h4>This is a list of Students</h4>
      <AddStudents />
      <StudentsList />
      <Students1 />
    </div>
  );
};
