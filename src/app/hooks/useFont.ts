import { Quicksand } from "next/font/google";

const quicksandLight = Quicksand({ weight: "300", subsets: ["latin"] });
const quicksandMedium = Quicksand({ weight: "500", subsets: ["latin"] });
const quicksandBold = Quicksand({ weight: "700", subsets: ["latin"] });

export default function useFont() {
  const light = (classNames: String) => {
    return `${quicksandLight.className} ${classNames}`;
  };

  const medium = (classNames: String) => {
    return `${quicksandMedium.className} ${classNames}`;
  };

  const bold = (classNames: String) => {
    return `${quicksandBold.className} ${classNames} ${"text-2xl"}`;
  };

  const font = {
    light,
    medium,
    bold,
  };

  return {
    light,
    medium,
    bold,
    font,
  };
}
