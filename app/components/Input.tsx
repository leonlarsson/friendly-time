"use client";

import { useState } from "react";
import { parseDate, strict } from "chrono-node";
import { getDiscordTimestamps, getWeekNumber } from "../utils";

export const Input = () => {
  const [textInput, setTextInput] = useState(""); // State for text input
  const [dateInput, setDateInput] = useState(""); // State for datetime-local input
  const [useDateInput, setUseDateInput] = useState(false); // State for toggling between text input and datetime-local input

  const [strictMode, setStrictMode] = useState(false);
  const parsedDate = strictMode ? strict.parseDate(useDateInput ? dateInput : textInput) : parseDate(useDateInput ? dateInput : textInput);

  const parsedDateFormats = {
    Local: parsedDate?.toString(),
    "UTC Date": parsedDate?.toUTCString(),
    "ISO Date": parsedDate?.toISOString(),
    Time: parsedDate?.toLocaleTimeString(),
    "Day of the Month": parsedDate?.getDate(),
    "Month of the Year": parsedDate ? parsedDate?.getMonth() + 1 : null,
    Year: parsedDate?.getFullYear(),
    Week: parsedDate ? getWeekNumber(parsedDate) : null,
    "Timestamp (milliseconds)": parsedDate?.getTime(),
    "Timestamp (seconds)": parsedDate ? Math.floor(parsedDate?.getTime() / 1000) : null
  };

  const onTextInput = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    setTextInput(typeof e === "string" ? e : e.target.value);
    setDateInput("");
    setUseDateInput(false);
  };

  const onDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value.replace("T", " "));
    setDateInput(e.target.value.replace("T", " "));
    setUseDateInput(true);
  };

  return (
    <>
      <div className="mb-3 flex flex-wrap justify-between gap-2">
        <input
          className="flex-1 rounded-md border border-black/50 p-2 text-xl text-black data-[current-input=false]:border-dashed dark:border-white/50 dark:bg-neutral-950 dark:text-white"
          type="text"
          data-current-input={!useDateInput}
          placeholder="next friday at 6pm"
          value={textInput}
          onChange={onTextInput}
        />
        <input className="rounded-md border border-black/50 p-2 text-xl text-black data-[current-input=false]:border-dashed dark:border-white/50 dark:bg-neutral-950 dark:text-white" type="datetime-local" data-current-input={useDateInput} value={dateInput} onChange={onDateInput} />
      </div>

      <div className="flex flex-wrap gap-2">
        {["now", "tomorrow", "next tuesday at 6am", "next friday at 13:45", "last friday", "in 69 days at 4:20 pm"].map(example => (
          <button key={example} className="select-none rounded-md border border-black/50 p-2 px-3 transition-colors hover:bg-neutral-200 dark:border-white/50 dark:bg-neutral-950 dark:hover:bg-neutral-700" onClick={() => onTextInput(example)}>
            {example}
          </button>
        ))}
      </div>

      <details className="select-none">
        <summary className="mt-4 cursor-pointer text-xl font-semibold">Settings</summary>
        <div className="flex flex-col gap-2 py-2">
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" checked={strictMode} onChange={() => setStrictMode(!strictMode)} />
              <span>Strict mode</span>
            </label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">If enabled, parse only formal date patterns.</p>
          </div>
        </div>

        <span>
          This app uses{" "}
          <a className="font-semibold underline" href="https://github.com/wanasit/chrono" target="_blank">
            wanasit/chrono
          </a>{" "}
          and was created by{" "}
          <a className="font-semibold underline" href="https://x.com/mozzyfx" target="_blank">
            me
          </a>
          .
        </span>
      </details>

      <hr className="my-4 border-neutral-900 dark:border-neutral-300" />

      <div className="flex flex-col gap-2">
        {Object.entries(parsedDateFormats).map(([key, value]) => (
          <span key={key}>
            {key}: <span className="select-all font-medium dark:font-semibold">{value ?? "Invalid Date"}</span>
          </span>
        ))}

        <details>
          <summary className="cursor-pointer font-semibold underline">Discord Timestamps</summary>
          <div className="flex flex-col gap-2 py-2">
            {Object.entries(getDiscordTimestamps(parsedDate)).map(([key, value]) => (
              <span key={key}>
                {key}: <span className="select-all font-medium dark:font-semibold">{value.value ?? "Invalid Date"}</span> = <q>{value.result}</q>
              </span>
            ))}
          </div>
        </details>
      </div>
    </>
  );
};

export default Input;
