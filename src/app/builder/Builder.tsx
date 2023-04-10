"use client";

import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { useComponents } from "../context/ComponentsContext";
import { DeepestProvider } from "../context/DepthContext";
import Wysiwyg from "./Wysiwyg";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export default function Builder() {
  const [isBrowser, setIsBrowser] = useState(false);
  const { selected, setSelected, onOpen, isOpen, onClose } =
    useComponents() as any;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Header />
      <DeepestProvider>
        {isBrowser && (
          <DndProvider
            backend={TouchBackend}
            options={{ enableTouchEvents: false, enableMouseEvents: true }}
          >
            <div className="flex-1 flex bg-gray-100">
              <SideBar />
              <Wysiwyg />
              <Drawer
                placement={"right"}
                onClose={onClose}
                isOpen={isOpen}
                size={"md"}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader borderBottomWidth="1px">
                    Edit {selected?.type}
                  </DrawerHeader>
                  <DrawerBody>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </div>
          </DndProvider>
        )}
      </DeepestProvider>
    </div>
  );
}
