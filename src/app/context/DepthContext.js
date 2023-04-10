import React, { useState, useContext } from "react";

const DeepestContext = React.createContext({});

export function useDeepest() {
  return useContext(DeepestContext);
}

export function DeepestProvider({ children }) {
  const [deepest, setDeepest] = useState(0);

  return (
    <DeepestContext.Provider value={{ deepest, setDeepest }}>
      {children}
    </DeepestContext.Provider>
  );
}
