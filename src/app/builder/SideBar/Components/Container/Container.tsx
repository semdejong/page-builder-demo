"use client";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";

import useFont from "@/app/hooks/useFont";
import { useDeepest } from "@/app/context/DepthContext";
import ContextMenuContainer from "./ContextMenuContainer";
import Button from "../Button";

export default function Container({
  isRoot,
  id,
  depth = 0,
}: {
  isRoot: boolean;
  id?: string;
  depth?: number;
}) {
  const [components, setComponents] = useState<any>([]);

  const { deepest, setDeepest } = useDeepest() as any;

  const { font } = useFont();

  const [{ isOver }, drop] = useDrop({
    accept: "component",
    drop: (item: any, monitor) => {
      console.log(monitor.getClientOffset());
      if (depth < deepest) {
        return;
      }
      setComponents([
        ...components,
        { type: item.id, id: Math.random(), depth: isRoot ? 1 : depth + 1 },
      ]);
    },
    collect: (monitor: any) => ({
      isOver: depth >= deepest && !!monitor.isOver(),
    }),
  }) as any;

  useEffect(() => {
    console.log("depth: " + depth + " deepestDepth: " + deepest, isOver);

    if (depth >= deepest && depth != 0 && isOver) {
      delay(1).then(() => setDeepest(depth));
    }

    if (!isOver && depth >= deepest) {
      setDeepest(deepest - 1 > 0 ? deepest - 1 : 0);
    }
  }, [isOver]);

  return (
    <ContextMenuContainer containerName={id}>
      <div
        className={
          " w-full h-full hover:cursor-pointer p-4 " +
          (isOver && "border-2 border-blue-500 ") +
          (!isRoot && " border h-1/2")
        }
        ref={drop}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        Deepest: {deepest} depth: {depth}
        {components.length == 0 &&
          (isRoot ? (
            <div className="h-full flex-1 flex items-center justify-center">
              <p className={font.medium("text-gray-500 text-lg")}>
                Start by adding compontents to your page.
              </p>
            </div>
          ) : (
            <div className="h-full w-full flex-1 flex items-center justify-center">
              <p className={font.light("text-gray-500 text-lg")}>
                Start by adding compontents to your container.
              </p>
            </div>
          ))}
        {components.length > 0 && <RenderBody components={components} />}
      </div>
    </ContextMenuContainer>
  );
}

function RenderBody({ components }: { components: any[] }) {
  return (
    <div>
      {components.map((component) => {
        return (
          <div>
            {component.type == "container" && (
              <Container isRoot={false} id={"123"} depth={component.depth} />
            )}
            {component.type == "button" && <Button />}
          </div>
        );
      })}
    </div>
  );
}

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
