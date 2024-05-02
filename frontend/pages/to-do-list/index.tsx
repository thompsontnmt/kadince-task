import React, { useState } from "react";
import List from "../../src/content/ToDoList/List";
import { MainBox } from "../../src/components/GlobalComponents";
import Header from "../../src/content/ToDoList/Header";
import { Stack } from "@mui/material";
import { ActivityProvider } from "../../src/context/ActivityContext";

const ToDoList = () => {


  return (
    <ActivityProvider>
      <MainBox>
        <Stack gap={2}>
          <Header />
          <List />
        </Stack>
      </MainBox>
    </ActivityProvider>
  );
};

export default ToDoList;
