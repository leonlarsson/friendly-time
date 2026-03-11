import { FC } from "react";
import { CopyableText } from "./CopyableText";
import { getParsedDateFormats } from "../utils";
import { useSecondTick } from "../hooks/useSecondTick";

type Props = {
  parsedDate: Date | null;
  timeTickingDisabled: boolean;
};

export const BasicInfoDisplay: FC<Props> = ({ parsedDate, timeTickingDisabled }) => {
  useSecondTick(timeTickingDisabled);

  return (
    <div className="flex flex-col">
      {Object.entries(getParsedDateFormats(parsedDate)).map(([key, value]) => (
        <span key={key} className="border-l-2 border-transparent px-2 py-0.5 hover:border-l-black hover:bg-neutral-200 dark:hover:border-l-white dark:hover:bg-neutral-900">
          {key}: <CopyableText text={value} />
        </span>
      ))}
    </div>
  );
};
