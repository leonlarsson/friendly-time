import { useEffect, useState } from "react";
import CopyableText from "./CopyableText";
import { getParsedDateFormats } from "../utils";

type Props = {
  parsedDate: Date | null;
  timeTickingDisabled: boolean;
};

export default ({ parsedDate, timeTickingDisabled }: Props) => {
  const [_, setRefreshToggle] = useState(false);

  // Update every second
  useEffect(() => {
    if (timeTickingDisabled) return;
    const interval = setInterval(() => setRefreshToggle(prev => !prev), 1000);
    return () => clearInterval(interval);
  }, [timeTickingDisabled]);

  return (
    <div className="flex flex-col">
      {Object.entries(getParsedDateFormats(parsedDate)).map(([key, value]) => (
        <span key={key} className="border-l-2 border-transparent px-2 py-[2px] hover:border-l-black hover:bg-neutral-200 dark:hover:border-l-white dark:hover:bg-neutral-900">
          {key}: <CopyableText text={value} />
        </span>
      ))}
    </div>
  );
};
