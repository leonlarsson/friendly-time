"use client";

import { useState } from "react";
import { parseDate, strict } from "chrono-node";
import { getDiscordTimestamps, getParsedDateFormats, getTimezones } from "../utils";

export const Input = () => {
  const [textInput, setTextInput] = useState(""); // State for text input
  const [dateInput, setDateInput] = useState(new Date().toLocaleString().slice(0, 19)); // State for datetime-local input. Initial state is the current date
  const [useDateInput, setUseDateInput] = useState(true); // State for toggling between text input and datetime-local input
  const [strictMode, setStrictMode] = useState(false);
  const [use24HourFormat, setUse24HourFormat] = useState(false);
  const [sortTimezonesByTime, setSortTimezonesByTime] = useState(false);

  const parsedDate = strictMode ? strict.parseDate(useDateInput ? dateInput : textInput) : parseDate(useDateInput ? dateInput : textInput);

  const onTextInput = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    // On text input, set both text input and datetime-local input to the same value (though transformed to a format the datetime-local accepts). Also set useDateInput to false
    setTextInput(typeof e === "string" ? e : e.target.value);
    setDateInput(
      parseDate(typeof e === "string" ? e : e.target.value)
        ?.toLocaleString()
        .slice(0, 19) ?? new Date().toLocaleString().slice(0, 19)
    );
    setUseDateInput(false);
  };

  const onDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // On datetime-local input, set both text input and datetime-local input to the same value (but remove the T, otherwise parseDate thinks it's UTC). Also set useDateInput to true
    setTextInput(e.target.value.replace("T", " "));
    setDateInput(e.target.value.replace("T", " "));
    setUseDateInput(true);
  };

  return (
    <>
      {/* Inputs */}
      <div className="mb-3 flex flex-wrap justify-between gap-2">
        <input
          className="flex-1 rounded-md border border-black/50 p-2 text-xl text-black data-[current-input=false]:border-dashed dark:border-white/50 dark:bg-neutral-950 dark:text-white"
          type="text"
          aria-label="A text input field that chooses what date to show on the website."
          data-current-input={!useDateInput}
          placeholder="next friday at 6pm"
          value={textInput}
          onChange={onTextInput}
        />

        <input
          className="rounded-md border border-black/50 p-2 text-xl text-black data-[current-input=false]:border-dashed dark:border-white/50 dark:bg-neutral-950 dark:text-white"
          type="datetime-local"
          step={1}
          aria-label="A date/time picker that chooses what date to show on the website."
          data-current-input={useDateInput}
          value={dateInput}
          onChange={onDateInput}
        />
      </div>

      {/* Example buttons */}
      <div className="flex flex-wrap gap-2">
        {["now", "tomorrow", "next tuesday at 6am", "next friday at 13:45:32", "last friday", "in 69 days at 4:20 pm"].map(example => (
          <button
            key={example}
            className="select-none rounded-md border border-black/50 p-2 px-3 transition-colors hover:bg-neutral-200 dark:border-white/50 dark:bg-neutral-950 dark:hover:bg-neutral-800"
            aria-label="A button that populates the website with an exmaple date."
            onClick={() => onTextInput(example)}
          >
            {example}
          </button>
        ))}
      </div>

      {/* Settings & Info */}
      <details className="select-none">
        <summary className="mt-4 cursor-pointer text-xl font-semibold">Settings & Info</summary>
        <span>
          The input method with the solid border is the currently active one. Currently using the <span className="underline">{useDateInput ? "date" : "text"}</span> input.
        </span>

        <div className="flex flex-col gap-2 py-2">
          {/* Strict mode */}
          <div>
            <input type="checkbox" className="peer me-1 accent-black dark:accent-white" id="strictMode" checked={strictMode} onChange={() => setStrictMode(!strictMode)} />
            <label className="opacity-90 peer-checked:opacity-100" htmlFor="strictMode">
              Strict mode
            </label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">If enabled, parse only formal date patterns.</p>
          </div>

          {/* 24-hour format */}
          <div>
            <input type="checkbox" className="peer me-1 accent-black dark:accent-white" id="24HourFormat" checked={use24HourFormat} onChange={() => setUse24HourFormat(!use24HourFormat)} />
            <label className="opacity-90 peer-checked:opacity-100" htmlFor="24HourFormat">
              Display 24-hour time format
            </label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">If enabled, display time using the 24-hour format for the timezones. Otherwise, use 12-hour format.</p>
          </div>

          {/* Sort timezones by time */}
          <div>
            <input type="checkbox" className="peer me-1 accent-black dark:accent-white" id="sortTimezonesByTime" checked={sortTimezonesByTime} onChange={() => setSortTimezonesByTime(!sortTimezonesByTime)} />
            <label className="opacity-90 peer-checked:opacity-100" htmlFor="sortTimezonesByTime">
              Sort timezones by time
            </label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">If enabled, sort list of timezones by their time difference. Otherwise, sort alphabetically.</p>
          </div>
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

      <hr className="my-4 border-neutral-900 dark:border-neutral-300" />

      <div className="flex flex-col gap-1">
        {Object.entries(getParsedDateFormats(parsedDate)).map(([key, value]) => (
          <span key={key} className="rounded p-px px-2 hover:bg-neutral-200 dark:hover:bg-neutral-900">
            {key}:{" "}
            <span suppressHydrationWarning className="select-all font-medium dark:font-semibold">
              {value ?? "Invalid Date"}
            </span>
          </span>
        ))}

        <details>
          <summary className="cursor-pointer font-semibold underline">Discord Timestamps</summary>
          <div className="flex flex-col gap-1 py-2">
            {Object.entries(getDiscordTimestamps(parsedDate)).map(([key, value]) => (
              <span key={key} className="rounded p-px px-2 hover:bg-neutral-200 dark:hover:bg-neutral-900">
                {key}:{" "}
                <span suppressHydrationWarning className="select-all font-medium dark:font-semibold">
                  {value.value ?? "Invalid Date"}
                </span>{" "}
                = <q suppressHydrationWarning>{value.result}</q>
              </span>
            ))}
          </div>
        </details>

        <details>
          <summary className="cursor-pointer font-semibold underline">Timezones</summary>
          <div className="flex flex-col gap-1 py-2">
            {getTimezones(parsedDate, use24HourFormat, sortTimezonesByTime).map(timezone => (
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
      </div>
    </>
  );
};

export default Input;
