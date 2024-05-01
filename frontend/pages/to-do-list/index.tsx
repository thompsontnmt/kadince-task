import React, { useState } from "react";
import List from "../../src/content/ToDoList/List";
import { MainBox } from "../../src/components/GlobalComponents";
import Header from "../../src/content/ToDoList/Header";

const ToDoList = () => {
  const [showForm, setShowForm] = useState(false);


  return (
    <MainBox>
      <Header onAddClick={() => setShowForm(true)} />
      <List showForm={showForm} setShowForm={setShowForm} />
    </MainBox>
  );
};

export default ToDoList;
