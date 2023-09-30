import CopyableText from "./CopyableText";
import { getParsedDateFormats } from "../utils";

type Props = {
  parsedDate: Date | null;
};

export default ({ parsedDate }: Props) => {
  return Object.entries(getParsedDateFormats(parsedDate)).map(([key, value]) => (
    <span key={key} className="border-l-2 border-transparent p-px px-2 hover:border-l-black hover:bg-neutral-200 dark:hover:border-l-white dark:hover:bg-neutral-900">
      {key}: <CopyableText text={value} />
    </span>
  ));
};
