import React from "react";
import Button from "./Components/Button";
import Container from "./Components/Container";

export default function RenderComponent({ component }: { component: any }) {
  console.log(component);
  if (!component) return null;

  return (
    <div
      key={component.id}
      className="absolute"
      style={{ top: component.y, left: component.x }}
    >
      {component.type == "button" && (
        <Button
          width={component.width}
          height={component.heigth}
          component={component}
        />
      )}

      {component.type == "container" && (
        <Container
          height={component.height}
          width={component.width}
          component={component}
        />
      )}
    </div>
  );
}
