"use client";
import React, { useEffect, useState } from "react";
import useFont from "@/app/hooks/useFont";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDrag } from "react-dnd";
import Container from "../SideBar/Components/Container";

export default function ComputerPage({}: {}) {
  const { font } = useFont();

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  return (
    <div className="p-10 h-full w-full">
      {isBrowser && (
        <div className="h-full w-full bg-white border shadow-lg rounded-lg flex items-center justify-center">
          {" "}
          <Container isRoot={true} />
        </div>
      )}
    </div>
  );
}
