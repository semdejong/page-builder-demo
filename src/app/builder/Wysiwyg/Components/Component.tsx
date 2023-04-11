import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useComponents } from "@/app/context/ComponentsContext";

export default function Component({ component, children }: any) {
  const { components, setComponents, setReplace, setSelected } =
    useComponents() as any;

  const [hovered, setHovered] = useState(false);
  const [size, setSize] = useState({
    width: component.width,
    height: component.height,
  });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<any>(null);

  useEffect(() => {
    setSize({
      width: component.width,
      height: component.height,
    });
  }, [component]);

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

  const resizeHandlesSizeWidth = size.width / 10;
  const resizeHandlesSizeHeight = size.height / 10;
  const resizeHandleThickness = (size.width + size.height) / 2 / 10 / 2.8;

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      let x = component.x;
      let y = component.y;
      let width = component.width;
      let height = component.height;
      if (resizeDirection?.includes("e")) {
        width = event.clientX - component.canvasX - component.x;
      }

      if (resizeDirection?.includes("w")) {
        x = event.clientX - component.canvasX;
        width =
          component.width + component.x - event.clientX + component.canvasX;
      }

      if (resizeDirection?.includes("n")) {
        y = event.clientY - component.canvasY;
        height =
          component.height + component.y - event.clientY + component.canvasY;
      }

      if (resizeDirection?.includes("s")) {
        height = event.clientY - component.canvasY - component.y;
      }
      component.updateComponent({
        ...component,
        x,
        width,
        height,
        y,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [resizeDirection]);

  return (
    <div
      className={"relative " + (isDragging && " hidden")}
      onDoubleClick={() => setSelected(component)}
      ref={!isResizing ? drag : null}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}

      <div
        onMouseEnter={() => setIsResizing(true)}
        onMouseLeave={() => setIsResizing(false)}
        onMouseDown={(e) => {
          console.log("mouse down");
          setResizeDirection("nw");
        }}
        onMouseUp={() => setResizeDirection(null)}
        className="hover:cursor-nw-resize"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${resizeHandlesSizeWidth}px`,
          height: `${resizeHandlesSizeHeight}px`,
          borderLeft: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderTop: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderColor: hovered ? "rgba(0,0,0,1)" : "transparent",
          zIndex: 1,
        }}
      ></div>

      <div
        onMouseEnter={() => setIsResizing(true)}
        onMouseLeave={() => setIsResizing(false)}
        onMouseDown={(e) => {
          console.log("mouse down");
          setResizeDirection("ne");
        }}
        onMouseUp={() => setResizeDirection(null)}
        className="hover:cursor-ne-resize"
        style={{
          position: "absolute",
          top: 0,
          left: `calc(100% - ${resizeHandlesSizeWidth}px)`,
          width: `${resizeHandlesSizeWidth}px`,
          height: `${resizeHandlesSizeHeight}px`,
          borderRight: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderTop: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderColor: hovered ? "rgba(0,0,0,1)" : "transparent",
          zIndex: 1,
        }}
      ></div>

      <div
        onMouseEnter={() => setIsResizing(true)}
        onMouseLeave={() => setIsResizing(false)}
        onMouseDown={(e) => {
          console.log("mouse down");
          setResizeDirection("se");
        }}
        onMouseUp={() => setResizeDirection(null)}
        className="hover:cursor-se-resize"
        style={{
          position: "absolute",
          top: `calc(100% - ${resizeHandlesSizeHeight}px)`,
          left: `calc(100% - ${resizeHandlesSizeWidth}px)`,
          width: `${resizeHandlesSizeWidth}px`,
          height: `${resizeHandlesSizeHeight}px`,
          borderRight: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderBottom: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderColor: hovered ? "rgba(0,0,0,1)" : "transparent",
          zIndex: 1,
        }}
      ></div>

      <div
        onMouseEnter={() => setIsResizing(true)}
        onMouseLeave={() => setIsResizing(false)}
        onMouseDown={(e) => {
          console.log("mouse down");
          setResizeDirection("sw");
        }}
        onMouseUp={() => setResizeDirection(null)}
        className="hover:cursor-sw-resize"
        style={{
          position: "absolute",
          top: `calc(100% - ${resizeHandlesSizeHeight}px)`,
          left: 0,
          width: `${resizeHandlesSizeWidth}px`,
          height: `${resizeHandlesSizeHeight}px`,
          borderLeft: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderBottom: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderColor: hovered ? "rgba(0,0,0,1)" : "transparent",
          zIndex: 1,
        }}
      ></div>

      <div
        onMouseEnter={() => setIsResizing(true)}
        onMouseLeave={() => setIsResizing(false)}
        onMouseDown={(e) => {
          console.log("mouse down");
          setResizeDirection("w");
        }}
        onMouseUp={() => setResizeDirection(null)}
        className="hover:cursor-w-resize"
        style={{
          position: "absolute",
          top: `calc(50% - ${resizeHandlesSizeHeight}px)`,
          left: 0,
          width: `${resizeHandlesSizeWidth}px`,
          height: `${resizeHandlesSizeHeight * 2}px`,
          borderLeft: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderColor: hovered ? "rgba(0,0,0,1)" : "transparent",
          zIndex: 1,
        }}
      ></div>

      <div
        onMouseDown={(e) => {
          console.log("mouse down");
          setResizeDirection("e");
        }}
        onMouseUp={() => setResizeDirection(null)}
        onMouseEnter={() => setIsResizing(true)}
        onMouseLeave={() => setIsResizing(false)}
        className="hover:cursor-w-resize"
        style={{
          position: "absolute",
          top: `calc(50% - ${resizeHandlesSizeHeight}px)`,
          left: `calc(100% - ${resizeHandlesSizeWidth}px)`,
          width: `${resizeHandlesSizeWidth}px`,
          height: `${resizeHandlesSizeHeight * 2}px`,
          borderRight: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderColor: hovered ? "rgba(0,0,0,1)" : "transparent",
          zIndex: 1,
        }}
      ></div>

      <div
        onMouseEnter={() => setIsResizing(true)}
        onMouseLeave={() => setIsResizing(false)}
        onMouseDown={(e) => {
          console.log("mouse down");
          setResizeDirection("n");
        }}
        onMouseUp={() => setResizeDirection(null)}
        className="hover:cursor-n-resize"
        style={{
          position: "absolute",
          top: 0,
          left: `calc(50% - ${resizeHandlesSizeWidth}px)`,
          width: `${resizeHandlesSizeWidth * 2}px`,
          height: `${resizeHandlesSizeHeight}px`,
          borderTop: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderColor: hovered ? "rgba(0,0,0,1)" : "transparent",
          zIndex: 1,
        }}
      ></div>

      <div
        onMouseEnter={() => setIsResizing(true)}
        onMouseLeave={() => setIsResizing(false)}
        onMouseDown={(e) => {
          console.log("mouse down");
          setResizeDirection("s");
        }}
        onMouseUp={() => setResizeDirection(null)}
        className="hover:cursor-n-resize"
        style={{
          position: "absolute",
          top: `calc(100% - ${resizeHandlesSizeHeight}px)`,
          left: `calc(50% - ${resizeHandlesSizeWidth}px)`,
          width: `${resizeHandlesSizeWidth * 2}px`,
          height: `${resizeHandlesSizeHeight}px`,
          borderBottom: `${resizeHandleThickness}px solid rgba(0,0,0,1)`,
          borderColor: hovered ? "rgba(0,0,0,1)" : "transparent",
          zIndex: 1,
        }}
      ></div>
    </div>
  );
}
