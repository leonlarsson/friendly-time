import { toast } from "react-hot-toast";

type Props = {
  text?: string | null;
};

export default ({ text }: Props) => {
  return (
    <span
      suppressHydrationWarning
      data-copyable={typeof text === "string"}
      className="font-medium data-[copyable=true]:cursor-copy data-[copyable=true]:select-all dark:font-semibold"
      title="Click to copy"
      onClick={e => {
        e.stopPropagation();
        if (typeof text === "string") navigator.clipboard?.writeText(text).then(() => toast.success(`Copied to clipboard:\n${text}`));
      }}
    >
      {text ?? "Invalid Date"}
    </span>
  );
};
