import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Switch,
} from "@chakra-ui/react";

import { useEditor } from "@/app/context/EditorContext";

export default function SettingsModal({ children }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { enableSnapping, setEnableSnapping } = useEditor() as any;

  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editor Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full h-96 overflow-y-auto">
              <div className="">
                <div className="flex items-center justify-between">
                  <p className="text-lg">Snapping</p>
                  <Switch
                    value={enableSnapping}
                    onChange={(e) => setEnableSnapping(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <p className="pl-4">Component Snapping</p>
                  <Switch
                    value={enableSnapping}
                    onChange={(e) => setEnableSnapping(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
