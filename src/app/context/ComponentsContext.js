import React, { useState, useContext, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";

const ComponentsContext = React.createContext({});

export function useComponents() {
  return useContext(ComponentsContext);
}

export function ComponentsProvider({ children }) {
  const [components, setComponents] = useState([]);
  const [replace, setReplace] = useState(null);

  const [selected, setSelected] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (selected) {
      onOpen();
    } else {
      onClose();
    }
  }, [selected]);

  useEffect(() => {
    if (!isOpen) {
      setSelected(null);
    }
  }, [isOpen]);

  return (
    <ComponentsContext.Provider
      value={{
        components,
        setComponents,
        replace,
        setReplace,
        selected,
        setSelected,
        isOpen,
        onOpen,
        onClose,
      }}
    >
      {children}
    </ComponentsContext.Provider>
  );
}
