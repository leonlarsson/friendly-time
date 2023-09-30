import CopyableText from "./CopyableText";
import { getDiscordTimestamps } from "../utils";

type Props = {
  parsedDate: Date | null;
  open: boolean;
};

export default ({ parsedDate, open }: Props) => {
  return (
    <details open={open}>
      <summary className="cursor-pointer font-semibold underline">Discord Timestamps</summary>
      <div className="flex flex-col gap-1 py-2">
        {Object.entries(getDiscordTimestamps(parsedDate)).map(([key, value]) => (
          <span key={key} className="border-l-2 border-transparent p-px px-2 hover:border-l-black hover:bg-neutral-200 dark:hover:border-l-white dark:hover:bg-neutral-900">
            {key}: <CopyableText text={value.value} /> = <q suppressHydrationWarning>{value.result}</q>
          </span>
        ))}
      </div>
    </details>
  );
};
