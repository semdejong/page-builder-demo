import React, { useState, useContext, useEffect } from "react";

const EditorContext = React.createContext({});

export function useEditor() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }) {
  const [enableSnapping, setEnableSnapping] = useState(true);
  const [enableComponentSnapping, setEnableComponentSnapping] = useState(true);
  const [enableGridSnapping, setEnableGridSnapping] = useState(true);

  useEffect(() => {
    if (!enableSnapping) {
      setEnableComponentSnapping(false);
      setEnableGridSnapping(false);
    } else {
      if (!enableComponentSnapping && !enableGridSnapping) {
        setEnableComponentSnapping(true);
        setEnableGridSnapping(true);
      }
    }
  }, [enableSnapping]);

  useEffect(() => {
    if (!enableComponentSnapping) {
      setEnableComponentSnapping(false);
    }
    if (!enableGridSnapping && !enableComponentSnapping) {
      setEnableSnapping(false);
    }

    if (enableComponentSnapping) {
      setEnableSnapping(true);
    }
  }, [enableComponentSnapping]);

  useEffect(() => {
    if (!enableGridSnapping) {
      setEnableGridSnapping(false);
    }
    if (!enableGridSnapping && !enableComponentSnapping) {
      setEnableSnapping(false);
    }

    if (enableComponentSnapping) {
      setEnableSnapping(true);
    }
  }, [enableGridSnapping]);

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
