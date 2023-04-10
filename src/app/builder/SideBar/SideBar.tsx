"use client";

import useFont from "@/app/hooks/useFont";
import React, { useEffect, useState } from "react";
import Component from "./Components/Component";
import { RxContainer, RxButton } from "react-icons/rx";
import { Button } from "@chakra-ui/react";

export default function SideBar() {
  const { font } = useFont();

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("window is defined");
      setIsBrowser(true);
    }
  }, []);

  return (
    <div className="w-80 overflow-y-auto shadow-lg bg-gray-100 z-10 h-full border-r">
      <div className="w-full">
        <div className="w-full h-16 flex items-center justify-center rounded-b-md ">
          <p className={font.medium("text-2xl text-gray-700")}>Components</p>
        </div>
        {isBrowser && (
          <div className="h-full overflow-y-auto w-full p-2">
            <div className="flex justify-between space-x-1">
              <Component
                id={"container"}
                title="Container"
                icon={<RxContainer />}
              />
              <Component id={"button"} title="Button" icon={<RxButton />} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
