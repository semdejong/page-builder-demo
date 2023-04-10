import { Quicksand } from "next/font/google";
import useFont from "./hooks/useFont";
import Builder from "./builder";

export default function Home() {
  const { font } = useFont();

  return (
    <main>
      <div className="">
        <Builder />
      </div>
    </main>
  );
}
