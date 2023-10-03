import { useEffect, useState } from "react";
import CopyableText from "./CopyableText";

type Props = {
  showOnlyDiscordTimestamps: boolean;
  setshowOnlyDiscordTimestamps: (value: boolean) => void;
  timeTickingDisabled: boolean;
  setTimeTickingDisabled: (value: boolean) => void;
  searchParamStateDisabled: boolean;
  setSearchParamStateDisabled: (value: boolean) => void;
  timestampParseMilliseconds: boolean;
  setTimestampParseMilliseconds: (value: boolean) => void;
  useDateInput: boolean;
  strictMode: boolean;
  setStrictMode: (value: boolean) => void;
  use24HourFormat: boolean;
  setUse24HourFormat: (value: boolean) => void;
  sortTimezonesByTime: boolean;
  setSortTimezonesByTime: (value: boolean) => void;
};

export default ({
  showOnlyDiscordTimestamps,
  setshowOnlyDiscordTimestamps,
  timeTickingDisabled,
  setTimeTickingDisabled,
  searchParamStateDisabled,
  setSearchParamStateDisabled,
  timestampParseMilliseconds,
  setTimestampParseMilliseconds,
  useDateInput,
  strictMode,
  setStrictMode,
  use24HourFormat,
  setUse24HourFormat,
  sortTimezonesByTime,
  setSortTimezonesByTime
}: Props) => {
  const [settingsFilter, setSettingsFilter] = useState("");

  const settings = [
    {
      name: "Show only Discord Timestamps",
      description: "If enabled, show only Discord timestamps. Otherwise, show all modules.",
      value: showOnlyDiscordTimestamps,
      setValue: setshowOnlyDiscordTimestamps
    },
    {
      name: "No time ticking",
      description: `If enabled, do not update the time each second. Otherwise, update the time each second..`,
      value: timeTickingDisabled,
      setValue: setTimeTickingDisabled
    },
    {
      name: "Don't save input to URL",
      description: `If enabled, do not append input to the URL.`,
      value: searchParamStateDisabled,
      setValue: setSearchParamStateDisabled
    },
    {
      name: "Parse timestamps as milliseconds",
      description: `If enabled, parse timestamps as milliseconds instead of seconds. Currently parsing timestamps in ${timestampParseMilliseconds === true ? "milliseconds" : "seconds"}.`,
      value: timestampParseMilliseconds,
      setValue: setTimestampParseMilliseconds
    },
    {
      name: "Strict mode",
      description: "If enabled, parse only formal date patterns.",
      value: strictMode,
      setValue: setStrictMode
    },
    {
      name: "Display 24-hour time format",
      description: "If enabled, display time using the 24-hour format for the timezones. Otherwise, use 12-hour format.",
      value: use24HourFormat,
      setValue: setUse24HourFormat
    },
    {
      name: "Sort timezones by time",
      description: "If enabled, sort list of timezones by their UTC offset. Otherwise, sort alphabetically.",
      value: sortTimezonesByTime,
      setValue: setSortTimezonesByTime
    }
  ];

  const filteredSettings = settings.filter(setting => [setting.name, setting.description].some(text => text.toLowerCase().includes(settingsFilter.toLowerCase())));

  // Save settings to a single localStorage object
  useEffect(
    () => {
      localStorage.setItem(
        "friendlyTimeSettings",
        JSON.stringify({
          showOnlyDiscordTimestamps,
          timeTickingDisabled,
          searchParamStateDisabled,
          timestampParseMilliseconds,
          strictMode,
          use24HourFormat,
          sortTimezonesByTime
        })
      );
    },
    settings.map(({ value }) => value)
  );

  return (
    <details className="select-none">
      <summary className="mt-4 cursor-pointer select-none text-xl font-semibold">Settings & Info</summary>
      <span>
        The input method with the solid border is the currently active one. Currently using the <span className="underline">{useDateInput ? "date" : "text"}</span> input.
        <br />
        Did you know you can easily copy the dates by clicking on then? <CopyableText text="Try it out!" />
      </span>

      <div>
        <input
          className="mt-2 rounded border border-black/50 p-1 text-black dark:border-white/50 dark:bg-neutral-950 dark:text-white"
          type="text"
          aria-label="A text input field to filter the settings."
          placeholder="Filter settings"
          value={settingsFilter}
          onChange={e => setSettingsFilter(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 py-2">
        {filteredSettings.map(({ name, description, value, setValue }) => (
          <div key={name}>
            <input type="checkbox" className="peer me-1 accent-black dark:accent-white" id={name} checked={value} onChange={() => setValue(!value)} />
            <label className="opacity-90 peer-checked:opacity-100" htmlFor={name}>
              {name}
            </label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
          </div>
        ))}

        {filteredSettings.length === 0 && <span className="text-red-600 dark:text-red-400">No matching settings.</span>}
      </div>

      <span>
        This app uses{" "}
        <a className="font-semibold hover:underline" href="https://github.com/wanasit/chrono" target="_blank">
          wanasit/chrono
        </a>{" "}
        and was created by{" "}
        <a className="font-semibold hover:underline" href="https://leonlarsson.com" target="_blank">
          me
        </a>
        .
      </span>

      <details className="mt-2">
        <summary className="cursor-pointer select-none font-semibold">Issues?</summary>
        <div>
          <span>Issues? Click this button to reset settings and refresh: </span>
          <button
            className="rounded bg-red-600 px-2 text-white"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Reset
          </button>
        </div>
      </details>
    </details>
  );
};
