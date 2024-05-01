import React, { useState } from "react";
import List from "../../src/content/ToDoList/List";
import { MainBox } from "../../src/components/GlobalComponents";
import Header from "../../src/content/ToDoList/Header";
import { Stack } from "@mui/material";

const ToDoList = () => {
  const [showForm, setShowForm] = useState(false);


  return (
    <MainBox>
      <Stack gap={2}>
        <Header onAddClick={() => setShowForm(true)} />
        <List showForm={showForm} setShowForm={setShowForm} />
      </Stack>
    </MainBox>
  );
};

export default ToDoList;
