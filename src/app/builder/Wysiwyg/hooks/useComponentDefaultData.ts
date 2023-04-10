export default function useComponentDefaultData() {
  const getComponentDefaultData = (componentName: string) => {
    switch (componentName) {
      case "container":
        return {
          type: "container",
          width: 200,
          height: 200,
          backgroundColor: "#ffffff",
          borderColor: "#000000",
          borderWidth: 1,
          borderRadius: 0,
        };
      case "button":
        return {
          type: "button",
          width: 100,
          height: 50,
          backgroundColor: "#3b82f6",
          text: "Button",
          textColor: "#ffffff",
          fontSize: 16,
          fontWeight: "normal",
          borderRadius: 0,
        };
    }
  };

  return {
    getComponentDefaultData,
  };
}
