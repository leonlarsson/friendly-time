import { getParsedDateFormats } from "../utils";

type Props = {
  parsedDate: Date | null;
};

export default ({ parsedDate }: Props) => {
  return Object.entries(getParsedDateFormats(parsedDate)).map(([key, value]) => (
    <span key={key} className="rounded p-px px-2 hover:bg-neutral-200 dark:hover:bg-neutral-900">
      {key}:{" "}
      <span suppressHydrationWarning className="select-all font-medium dark:font-semibold">
        {value ?? "Invalid Date"}
      </span>
    </span>
  ));
};
