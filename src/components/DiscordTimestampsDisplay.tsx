import { FC } from "react";
import { CopyableText } from "./CopyableText";
import { getDiscordTimestamps } from "../utils";
import { useSecondTick } from "../hooks/useSecondTick";

type Props = {
  parsedDate: Date | null;
  open: boolean;
  timeTickingDisabled: boolean;
};

export const DiscordTimestampsDisplay: FC<Props> = ({ parsedDate, open, timeTickingDisabled }) => {
  useSecondTick(timeTickingDisabled);

  return (
    <details open={open}>
      <summary className="cursor-pointer font-semibold underline select-none">Discord Timestamps</summary>
      <div className="flex flex-col py-2">
        {Object.entries(getDiscordTimestamps(parsedDate)).map(([key, value]) => (
          <span key={key} className="border-l-2 border-transparent px-2 py-0.5 hover:border-l-black hover:bg-neutral-200 dark:hover:border-l-white dark:hover:bg-neutral-900">
            {key}: <CopyableText text={value.value} /> = <q>{value.result}</q>
          </span>
        ))}
      </div>
    </details>
  );
};
