import { getParsedDateFormats } from "../utils";

type Props = {
  parsedDate: Date | null;
};

export default ({ parsedDate }: Props) => {
  return Object.entries(getParsedDateFormats(parsedDate)).map(([key, value]) => (
    <span key={key} className="border-l-2 border-transparent p-px px-2 hover:border-l-black hover:bg-neutral-200 dark:hover:border-l-white dark:hover:bg-neutral-900">
      {key}:{" "}
      <span suppressHydrationWarning data-copyable={typeof value === "string"} className="font-medium data-[copyable=true]:cursor-copy data-[copyable=true]:select-all dark:font-semibold" title="Click to copy" onClick={() => typeof value === "string" && navigator.clipboard.writeText(value)}>
        {value ?? "Invalid Date"}
      </span>
    </span>
  ));
};
