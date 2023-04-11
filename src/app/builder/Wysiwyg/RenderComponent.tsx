import React from "react";
import Button from "./Components/Button";
import Container from "./Components/Container";

export default function RenderComponent({
  component,
  updateComponent,
}: {
  component: any;
  updateComponent?: any;
}) {
  console.log(component);
  if (!component) return null;

  let componentWithUpdateComponent = { ...component, updateComponent };

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
          component={componentWithUpdateComponent}
        />
      )}

      {component.type == "container" && (
        <Container
          height={component.height}
          width={component.width}
          component={componentWithUpdateComponent}
        />
      )}
    </div>
  );
}
