import React, { useState, useContext } from "react";

const EditorContext = React.createContext({});

export function useEditor() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }) {
  const [enableSnapping, setEnableSnapping] = useState(true);
  const [enableComponentSnapping, setEnableComponentSnapping] = useState(true);
  const [enableGridSnapping, setEnableGridSnapping] = useState(true);

  return (
    <EditorContext.Provider
      value={{
        enableSnapping,
        setEnableSnapping,
        enableComponentSnapping,
        setEnableComponentSnapping,
        enableGridSnapping,
        setEnableGridSnapping,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
