"use client";

import React from "react";
import { useDrag } from "react-dnd";
import { useComponents } from "@/app/context/ComponentsContext";

export default function Component({
  id,
  title,
  icon,
}: {
  id: string;
  title: String;
  icon: any;
}) {
  const { components } = useComponents() as any;

  const [{ isDragging }, drag] = useDrag(
    () =>
      ({
        type: "component",
        item: () => {
          return { type: id };
        },
        collect: (monitor: any) => ({
          isDragging: !!monitor.isDragging(),
        }),
        end: () => {
          document.body.classList.remove("dragging");
        },
      } as any)
  ) as any;

  return (
    <div
      ref={drag}
      className={
        "w-1/2 h-16 flex flex-col items-center justify-center bg-white shadow-md rounded-md hover:cursor-grab " +
        (isDragging ? "border-2 border-blue-400" : "border")
      }
    >
      {icon}
      {title}
    </div>
  );
}
