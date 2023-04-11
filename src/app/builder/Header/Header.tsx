import React from "react";
import useFont from "@/app/hooks/useFont";
import { BsFillGearFill } from "react-icons/bs";
import SettingsModal from "./SettingsModal";

export default function Header() {
  const { font } = useFont();

  return (
    <div className="w-screen h-16 shadow-lg z-20 flex items-center px-8 border-b justify-between">
      <p className={font.bold("")}>EditorX</p>

      <SettingsModal>
        <div className="text-xl hover:cursor-pointer hover:shadow-lg">
          <BsFillGearFill className="" />
        </div>
      </SettingsModal>
    </div>
  );
}
