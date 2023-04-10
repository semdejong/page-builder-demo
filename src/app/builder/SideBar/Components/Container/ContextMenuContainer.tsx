"use client";

import { ContextMenu } from "chakra-ui-contextmenu";
import { Menu, MenuList, MenuItem, MenuDivider } from "@chakra-ui/menu";
import useFont from "@/app/hooks/useFont";
import { BsTrash } from "react-icons/bs";

export default function ContextMenuContainer({ children, containerName }: any) {
  const { font } = useFont();

  return (
    <ContextMenu
      renderMenu={() => (
        <MenuList backgroundColor="red.100">
          <div className="w-48 py-2 bg-white rounded-lg border shadow-sm space-y-1">
            <p className={font.medium("font-bold text-gray-800 px-2")}>
              {containerName} menu
            </p>
            <MenuDivider />
            <MenuItem>
              <span className="font-thin hover:bg-gray-100 w-full py-1 px-3">
                Delete
              </span>
            </MenuItem>
            <MenuItem>
              <span className=" hover:bg-gray-100 w-full py-1 px-3 font-bold text-red-500 flex items-center space-x-2 ">
                <BsTrash />
                <span>Delete</span>
              </span>
            </MenuItem>
          </div>
        </MenuList>
      )}
    >
      {(ref: any) => (
        <div className="w-full h-full hover:cursor-pointer" ref={ref}>
          {children}
        </div>
      )}
    </ContextMenu>
  );
}
