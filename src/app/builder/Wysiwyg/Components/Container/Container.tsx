import React from "react";
import Component from "../Component";

export default function Container({ component, width, height }: any) {
  return (
    <Component component={component}>
      <div className="bg-red-500" style={{ width: width, height: height }}>
        Container
      </div>
    </Component>
  );
}
