import React, { createContext, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from "react";

type ActivityContextType = {
  filter: boolean | null;
  setFilter: Dispatch<SetStateAction<boolean | null>>;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

const ActivityContext = createContext<ActivityContextType>({
  filter: null,
  setFilter: () => {},
  showForm: false,
  setShowForm: () => {}
});

export const ActivityProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [filter, setFilter] = useState<boolean | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <ActivityContext.Provider value={{ filter, setFilter, showForm, setShowForm }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);
