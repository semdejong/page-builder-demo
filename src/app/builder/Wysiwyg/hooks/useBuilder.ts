import { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { v4 } from "uuid";
import { useComponents } from "@/app/context/ComponentsContext";
import useComponentDefaultData from "./useComponentDefaultData";
import { useEditor } from "@/app/context/EditorContext";

export default function useBuilder() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [draggingComponent, setDraggingComponent] = useState<any>(null);
  const [xAlignLine, setXAlignLine] = useState<any>(null);
  const [yAlignLine, setYAlignLine] = useState<any>(null);

  const { getComponentDefaultData } = useComponentDefaultData();

  const { components, setComponents, replace, setReplace } =
    useComponents() as any;

  const { enableSnapping, enableComponentSnapping, enableGridSnapping } =
    useEditor() as any;

  const [{ isOver }, drop] = useDrop({
    accept: "component",
    drop: (item: any, monitor) => {
      console.log("drop");
      setXAlignLine(null);
      setYAlignLine(null);

      console.log(123, replace);

      if (replace && typeof replace.id === "string") {
        setComponents([
          ...components.filter((component: any) => component.id !== replace.id),
          { ...replace, x: draggingComponent.x, y: draggingComponent.y },
        ]);

        setReplace(null);

        setDraggingComponent(null);

        return;
      }

      setComponents([...components, { ...draggingComponent, id: v4() }]);
      setDraggingComponent(null);
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
    hover: (item: any, monitor: any) => {
      const widthOfComponent = draggingComponent?.width || 0;
      const heightOfComponent = draggingComponent?.height || 0;

      const dropX = monitor?.getClientOffset()?.x || 0;
      const dropY = monitor?.getClientOffset()?.y || 0;
      const containerX = containerRef.current?.getBoundingClientRect().x || 0;
      const containerY = containerRef.current?.getBoundingClientRect().y || 0;

      //get middle of container
      const containerMiddleX =
        (containerRef.current?.getBoundingClientRect().width || 0) / 2 || 0;
      const containerMiddleY =
        (containerRef.current?.getBoundingClientRect().height || 0) / 2 || 0;

      let x = dropX - containerX > 0 ? dropX - containerX : 0;
      let y = dropY - containerY > 0 ? dropY - containerY : 0;

      let hasXSnapped = false;

      let hasYSnapped = false;

      components?.forEach((component: any) => {
        if (
          component.x - x < 10 &&
          component.x - x > -10 &&
          enableComponentSnapping
        ) {
          x = component.x;
          setXAlignLine(component.x);
          hasXSnapped = true;
        }
        if (
          component.y - y < 10 &&
          component.y - y > -10 &&
          enableComponentSnapping
        ) {
          y = component.y;
          setYAlignLine(component.y);
          hasYSnapped = true;
        }
      });

      if (
        containerMiddleX -
          x +
          (hasXSnapped
            ? x
            : x -
              (widthOfComponent ||
                getComponentDefaultData(item.type)?.width ||
                100) /
                2) <
          10 &&
        containerMiddleX -
          x +
          (hasXSnapped
            ? x
            : x -
              (widthOfComponent ||
                getComponentDefaultData(item.type)?.width ||
                100) /
                2) >
          -10 &&
        enableGridSnapping
      ) {
        x = containerMiddleX - widthOfComponent / 2;
        setXAlignLine(containerMiddleX);
        hasXSnapped = true;
      }

      if (
        containerMiddleY -
          y +
          (hasYSnapped
            ? y
            : y -
              (heightOfComponent ||
                getComponentDefaultData(item.type)?.height ||
                50) /
                2) <
          10 &&
        containerMiddleY -
          y +
          (hasYSnapped
            ? y
            : y -
              (heightOfComponent ||
                getComponentDefaultData(item.type)?.height ||
                50) /
                2) >
          -10 &&
        enableGridSnapping
      ) {
        y = containerMiddleY - heightOfComponent / 2;
        setYAlignLine(containerMiddleY);
        hasYSnapped = true;
      }

      if (!hasXSnapped) {
        setXAlignLine(null);
      }
      if (!hasYSnapped) {
        setYAlignLine(null);
      }

      setDraggingComponent({
        type: item.type,
        id: replace?.id || Math.random(),
        x: hasXSnapped
          ? x
          : x -
            (widthOfComponent ||
              getComponentDefaultData(item.type)?.width ||
              100) /
              2,
        y: hasYSnapped
          ? y
          : y -
            (heightOfComponent ||
              getComponentDefaultData(item.type)?.height ||
              50) /
              2,
        width:
          widthOfComponent || getComponentDefaultData(item.type)?.width || 100,
        height:
          heightOfComponent || getComponentDefaultData(item.type)?.height || 50,
        canvasWidth: containerRef.current?.getBoundingClientRect().width || 0,
        canvasHeight: containerRef.current?.getBoundingClientRect().height || 0,
        canvasX: containerRef.current?.getBoundingClientRect().x || 0,
        canvasY: containerRef.current?.getBoundingClientRect().y || 0,
      });
    },
  }) as any;

  const dropMiddle = () => {
    if (draggingComponent) {
      const containerMiddleX =
        (containerRef.current?.getBoundingClientRect().width || 0) / 2 || 0;
      const containerMiddleY =
        (containerRef.current?.getBoundingClientRect().height || 0) / 2 || 0;

      const widthOfComponent = draggingComponent?.width || 0;
      const heightOfComponent = draggingComponent?.height || 0;

      if (
        containerMiddleX - widthOfComponent / 2 === draggingComponent.x &&
        containerMiddleY - heightOfComponent / 2 === draggingComponent.y
      ) {
        setXAlignLine(null);
        setYAlignLine(null);
        setComponents([...components, { ...draggingComponent }]);
        setDraggingComponent(null);
      }
    }
  };

  const updateComponent = (component: any) => {
    setComponents([
      ...components.filter((c: any) => c.id !== component.id),
      component,
    ]);
  };

  return {
    components,
    setComponents,
    updateComponent,
    containerRef,
    draggingComponent,
    setDraggingComponent,
    xAlignLine,
    setXAlignLine,
    yAlignLine,
    setYAlignLine,
    drop,
    dropMiddle,
    isOver,
  };
}
