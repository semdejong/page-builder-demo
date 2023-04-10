import React from "react";
import useBuilder from "./hooks/useBuilder";
import RenderComponent from "./RenderComponent";

import "./Custom.css";

export default function Wysiwyg() {
  const {
    components,
    draggingComponent,
    xAlignLine,
    yAlignLine,
    dropMiddle,
    isOver,
    drop,
    containerRef,
  } = useBuilder();

  return (
    <div className=" h-full w-full">
      <div
        ref={containerRef}
        // onMouseEnter={dropMiddle}
        className={
          "h-full w-full relative" + (isOver && " border-2 border-blue-500 ")
        }
      >
        <div ref={drop} className={"h-full w-full  relative p-16 "}>
          <div
            className={
              "flex-1 h-full bg-white relative border shadow-lg flex items-center justify-center overflow-hidden " +
              (isOver && "border-2 border-blue-500")
            }
          >
            {xAlignLine && (
              <div
                className="absolute border-l-2 border-blue-500 h-full w-1"
                style={{ left: xAlignLine }}
              ></div>
            )}
            {yAlignLine && (
              <div
                className="absolute border-t-2 border-blue-500 w-full h-1"
                style={{ top: yAlignLine }}
              ></div>
            )}

            <RenderComponent component={draggingComponent} />
            {components?.map((component: any) => (
              <RenderComponent component={component} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
