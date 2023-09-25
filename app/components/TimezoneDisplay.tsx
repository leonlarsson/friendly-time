import { useState } from "react";
import { getTimezones } from "../utils";

type Props = {
  parsedDate: Date | null;
  use24HourFormat: boolean;
  sortTimezonesByTime: boolean;
};

export default ({ parsedDate, use24HourFormat, sortTimezonesByTime }: Props) => {
  const [filter, setFilter] = useState("");

  return (
    <details>
      <input className="mt-2 rounded border border-black/50 p-1 text-black dark:border-white/50 dark:bg-neutral-950 dark:text-white" type="text" aria-label="A text input field to filter the timezones." placeholder="Filter cities" value={filter} onChange={e => setFilter(e.target.value)} />
      <summary className="cursor-pointer font-semibold underline">Timezones</summary>
      <div className="flex flex-col gap-1 py-2">
        {getTimezones(parsedDate, use24HourFormat, sortTimezonesByTime, filter).map(timezone => (
          <span key={timezone.city} className="rounded p-px px-2 hover:bg-neutral-200 dark:hover:bg-neutral-900">
            <span className="text-lg underline"> {timezone.city}</span>
            <br />
            Local:{" "}
            <span suppressHydrationWarning className="select-all font-medium dark:font-semibold">
              {timezone.result ?? "Invalid Date"}
            </span>
          </span>
        ))}
      </div>
    </details>
  );
};
