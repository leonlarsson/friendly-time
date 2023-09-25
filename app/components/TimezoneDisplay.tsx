import { useState } from "react";
import { getTimezones } from "../utils";

type Props = {
  parsedDate: Date | null;
  use24HourFormat: boolean;
  sortTimezonesByTime: boolean;
};

export default ({ parsedDate, use24HourFormat, sortTimezonesByTime }: Props) => {
  const filterParam = localStorage.getItem("timezoneFilter");
  const [filter, setFilter] = useState<string>(filterParam ?? "");

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    localStorage.setItem("timezoneFilter", e.target.value);
  };

  return (
    <details>
      <input className="mt-2 rounded border border-black/50 p-1 text-black dark:border-white/50 dark:bg-neutral-950 dark:text-white" type="text" aria-label="A text input field to filter the timezones." placeholder="Filter cities" value={filter} onChange={onFilterChange} />
      <summary className="cursor-pointer font-semibold underline">Timezones</summary>
      <div className="flex flex-col gap-2 py-2">
        {getTimezones(parsedDate, use24HourFormat, sortTimezonesByTime, filter).map(timezone => (
          <span key={timezone.city} className="group border-l-2 border-transparent p-px px-2 hover:border-l-black hover:bg-neutral-200 dark:hover:border-l-white dark:hover:bg-neutral-900">
            <span className="text-lg underline">
              {" "}
              {timezone.city}, {timezone.country}
            </span>{" "}
            <span className="hidden text-sm text-neutral-500 group-hover:inline dark:text-neutral-400">{timezone.code}</span>
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
