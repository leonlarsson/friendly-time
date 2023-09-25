import { useEffect } from "react";

type Props = {
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

export default ({ timestampParseMilliseconds, setTimestampParseMilliseconds, useDateInput, strictMode, setStrictMode, use24HourFormat, setUse24HourFormat, sortTimezonesByTime, setSortTimezonesByTime }: Props) => {
  const settings = [
    {
      name: "Parse milliseconds timestamps",
      description: `If enabled, parse timestamps in milliseconds. Otherwise, parse timestamps in seconds. Currently parsing timestamps in ${timestampParseMilliseconds === true ? "milliseconds" : "seconds"}.`,
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

  // Save settings to a single localStorage object
  useEffect(
    () => {
      localStorage.setItem(
        "friendlyTimeSettings",
        JSON.stringify({
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
      <summary className="mt-4 cursor-pointer text-xl font-semibold">Settings & Info</summary>
      <span>
        The input method with the solid border is the currently active one. Currently using the <span className="underline">{useDateInput ? "date" : "text"}</span> input.
      </span>

      <div className="flex flex-col gap-2 py-2">
        {settings.map(({ name, description, value, setValue }) => (
          <div key={name}>
            <input type="checkbox" className="peer me-1 accent-black dark:accent-white" id={name} checked={value} onChange={() => setValue(!value)} />
            <label className="opacity-90 peer-checked:opacity-100" htmlFor={name}>
              {name}
            </label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
          </div>
        ))}
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
    </details>
  );
};
