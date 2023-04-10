import React from "react";
import { useDrag } from "react-dnd";
import { useComponents } from "@/app/context/ComponentsContext";

export default function Component({ component, children }: any) {
  const { components, setComponents, setReplace, setSelected } =
    useComponents() as any;

  const [{ isDragging }, drag] = useDrag(
    () =>
      ({
        type: "component",
        item: () => {
          setReplace(component);

          return { type: component.type, id: component.id };
        },
        collect: (monitor: any) => ({
          isDragging: !!monitor.isDragging(),
        }),
      } as any)
  ) as any;

  return (
    <div
      className={isDragging && "hidden"}
      onDoubleClick={() => setSelected(component)}
      ref={drag}
    >
      {children}
    </div>
  );
}
