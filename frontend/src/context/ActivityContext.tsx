import React, { createContext, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from "react";

type ActivityContextType = {
  filter: boolean | null;
  setFilter: Dispatch<SetStateAction<boolean | null>>;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  sortOrder: string | null;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>};

const ActivityContext = createContext<ActivityContextType>({
  filter: null,
  setFilter: () => {},
  showForm: false,
  setShowForm: () => {},
  sortOrder: null,
setSortOrder: () => {}
});

export const ActivityProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [filter, setFilter] = useState<boolean | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState('desc');


  return (
    <ActivityContext.Provider value={{ filter, setFilter, showForm, setShowForm, sortOrder, setSortOrder }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);
