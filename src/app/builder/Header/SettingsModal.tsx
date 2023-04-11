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
  const {
    enableSnapping,
    setEnableSnapping,
    enableComponentSnapping,
    setEnableComponentSnapping,
    enableGridSnapping,
    setEnableGridSnapping,
  } = useEditor() as any;

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
                    isChecked={enableSnapping}
                    onChange={(e) => setEnableSnapping(e.target.checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="pl-4">Component Snapping</p>
                  <Switch
                    isChecked={enableComponentSnapping}
                    onChange={(e) =>
                      setEnableComponentSnapping(e.target.checked)
                    }
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="pl-4">Grid Snapping</p>
                <Switch
                  isChecked={enableGridSnapping}
                  onChange={(e) => setEnableGridSnapping(e.target.checked)}
                />
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
