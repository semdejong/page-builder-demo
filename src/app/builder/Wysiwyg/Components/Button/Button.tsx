import { Button as ChakraButton } from "@chakra-ui/react";
import Component from "../Component";

export default function Button({ component, width, height }: any) {
  return (
    <Component component={component}>
      <ChakraButton
        colorScheme="blue"
        onClick={() => console.log("Yeahahh")}
        width={width}
        height={height}
      >
        Button
      </ChakraButton>
    </Component>
  );
}
