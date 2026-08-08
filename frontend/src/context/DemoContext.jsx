import React, { createContext, useContext, useState } from 'react';

const DemoContext = createContext({
  demoMode: true,
  toggleDemoMode: () => {}
});

export const DemoProvider = ({ children }) => {
  const [demoMode, setDemoMode] = useState(true);

  const toggleDemoMode = () => {
    setDemoMode((prev) => !prev);
  };

  return (
    <DemoContext.Provider value={{ demoMode, toggleDemoMode }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => useContext(DemoContext);
