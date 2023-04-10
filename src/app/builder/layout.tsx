"use client";

import { ChakraProvider } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { ComponentsProvider } from "../context/ComponentsContext";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  return <ChakraProvider>{children}</ChakraProvider>;
}
