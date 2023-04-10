import React from "react";
import useFont from "@/app/hooks/useFont";

export default function Header() {
  const { font } = useFont();

  return (
    <div className="w-screen h-16 shadow-lg z-20 flex items-center px-8 border-b">
      <p className={font.bold("")}>EditorX</p>
    </div>
  );
}
