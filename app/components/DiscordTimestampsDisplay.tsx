import CopyableText from "./CopyableText";
import { getDiscordTimestamps } from "../utils";

type Props = {
  parsedDate: Date | null;
  open: boolean;
};

export default ({ parsedDate, open }: Props) => {
  return (
    <details open={open}>
      <summary className="cursor-pointer select-none font-semibold underline">Discord Timestamps</summary>
      <div className="flex flex-col py-2">
        {Object.entries(getDiscordTimestamps(parsedDate)).map(([key, value]) => (
          <span key={key} className="border-l-2 border-transparent px-2 py-[2px] hover:border-l-black hover:bg-neutral-200 dark:hover:border-l-white dark:hover:bg-neutral-900">
            {key}: <CopyableText text={value.value} /> = <q suppressHydrationWarning>{value.result}</q>
          </span>
        ))}
      </div>
    </details>
  );
};
