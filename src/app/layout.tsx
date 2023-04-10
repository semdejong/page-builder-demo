"use client";

import { ChakraProvider } from "@chakra-ui/react";
import "./globals.css";
import { ComponentsProvider } from "./context/ComponentsContext";

// export const metadata = {
//   title: "Page builder demo",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ChakraProvider>
          <ComponentsProvider>{children}</ComponentsProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
