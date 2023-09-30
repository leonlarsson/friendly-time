import { useState } from "react";
import { getTimezones } from "../utils";

type Props = {
  parsedDate: Date | null;
  use24HourFormat: boolean;
  sortTimezonesByTime: boolean;
};

export default ({ parsedDate, use24HourFormat, sortTimezonesByTime }: Props) => {
  const [favoriteTimezones, setFavoriteTimezones] = useState<string[]>(localStorage.getItem("favoriteTimezones") ? JSON.parse(localStorage.getItem("favoriteTimezones")!) : []);
  const filterParam = localStorage.getItem("timezoneFilter");
  const [filter, setFilter] = useState<string>(filterParam ?? "");
  const [showOnlyFavorited, setShowOnlyFavroted] = useState(false);

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    localStorage.setItem("timezoneFilter", e.target.value);
  };

  const addFavoriteTimezone = (timezoneCityAndCode: `${string}-${string}`) => {
    const updatedFavorites = [...favoriteTimezones, timezoneCityAndCode];
    setFavoriteTimezones(updatedFavorites);
    localStorage.setItem("favoriteTimezones", JSON.stringify(updatedFavorites));
  };

  const removeFavoriteTimezone = (timezoneCityAndCode: `${string}-${string}`) => {
    const updatedFavorites = favoriteTimezones.filter(timezone => timezone !== timezoneCityAndCode);
    setFavoriteTimezones(updatedFavorites);
    localStorage.setItem("favoriteTimezones", JSON.stringify(updatedFavorites));
  };

  return (
    <details>
      <input className="mt-2 rounded border border-black/50 p-1 text-black dark:border-white/50 dark:bg-neutral-950 dark:text-white" type="text" aria-label="A text input field to filter the timezones." placeholder="Filter cities" value={filter} onChange={onFilterChange} />
      <br />
      {/* Show only favorites */}
      <input type="checkbox" className="peer me-1 accent-black dark:accent-white" id="showFavorites" checked={showOnlyFavorited} onChange={() => setShowOnlyFavroted(!showOnlyFavorited)} />
      <label className="opacity-90 peer-checked:opacity-100" htmlFor="showFavorites">
        Show only favorites (click to toggle favorites)
      </label>

      <summary className="cursor-pointer font-semibold underline">Timezones</summary>
      <div className="flex flex-col gap-2 py-2">
        {getTimezones(parsedDate, use24HourFormat, sortTimezonesByTime, filter)
          .filter(timezone => (showOnlyFavorited ? favoriteTimezones.includes(`${timezone.city}-${timezone.code}`) || timezone.code === Intl.DateTimeFormat().resolvedOptions().timeZone : timezone.code))
          .map(timezone => {
            const isFavorite = favoriteTimezones.includes(`${timezone.city}-${timezone.code}`);
            const isUsersTimezone = timezone.code === Intl.DateTimeFormat().resolvedOptions().timeZone;

            return (
              <button
                key={timezone.city}
                data-favorite={isFavorite}
                data-users-timezone={isUsersTimezone}
                className="group border-l-2 border-transparent p-px px-2 text-left hover:border-l-black hover:bg-neutral-200 data-[users-timezone=true]:border-l-4 data-[users-timezone=true]:border-black dark:hover:border-l-white dark:hover:bg-neutral-900 dark:data-[users-timezone=true]:border-white"
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                onClick={() => {
                  if (isFavorite) return removeFavoriteTimezone(`${timezone.city}-${timezone.code}`);
                  return addFavoriteTimezone(`${timezone.city}-${timezone.code}`);
                }}
              >
                <span className="text-lg underline">
                  {isFavorite && <Star />}
                  {isUsersTimezone && <Home />}
                  {timezone.city}, {timezone.country}
                </span>{" "}
                <span className="hidden text-sm text-neutral-500 group-hover:inline dark:text-neutral-400">{timezone.code}</span>
                <br />
                Local:{" "}
                <span
                  suppressHydrationWarning
                  data-copyable={typeof timezone.result === "string"}
                  className="font-medium data-[copyable=true]:cursor-copy data-[copyable=true]:select-all dark:font-semibold"
                  title="Click to copy"
                  onClick={e => {
                    e.stopPropagation();
                    typeof timezone.result === "string" && navigator.clipboard.writeText(timezone.result);
                  }}
                >
                  {timezone.result ?? "Invalid Date"}
                </span>
              </button>
            );
          })}
      </div>
    </details>
  );
};

const Star = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="me-1 inline fill-black dark:fill-yellow-400" height="1em" viewBox="0 0 576 512">
    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
  </svg>
);

const Home = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="me-1 inline fill-black dark:fill-white" height="1em" viewBox="0 0 576 512">
    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
  </svg>
);
