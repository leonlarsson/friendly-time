"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { parseDate, strict } from "chrono-node";
import Settings from "./Settings";
import BasicInfoDisplay from "./BasicInfoDisplay";
import DiscordTimestampsDisplay from "./DiscordTimestampsDisplay";
import TimezoneDisplay from "./TimezoneDisplay";
import { buildDateTimeInputFormat } from "../utils";

export const Main = () => {
  const inputSearchParam = useSearchParams().get("input");
  let settings;
  if (typeof localStorage !== "undefined") settings = JSON.parse(localStorage.getItem("friendlyTimeSettings") ?? "{}");
  const [hasRendered, setHasRendered] = useState(false);
  const [textInput, setTextInput] = useState(inputSearchParam ?? "");
  const [dateInput, setDateInput] = useState("");
  const [useDateInput, setUseDateInput] = useState(inputSearchParam ? false : true);

  // Settings
  const [showOnlyDiscordTimestamps, setshowOnlyDiscordTimestamps] = useState<boolean>(settings?.showOnlyDiscordTimestamps ?? false);
  const [searchParamStateDisabled, setSearchParamStateDisabled] = useState(settings?.searchParamStateDisabled ?? false);
  const [timeTickingDisabled, setTimeTickingDisabled] = useState(settings?.timeTickingDisabled ?? false);
  const [timestampParseMilliseconds, setTimestampParseMilliseconds] = useState<boolean>(settings?.timestampParseMilliseconds ?? false);
  const [strictMode, setStrictMode] = useState(settings?.strictMode ?? false);
  const [use24HourFormat, setUse24HourFormat] = useState(settings?.use24HourFormat ?? false);
  const [sortTimezonesByTime, setSortTimezonesByTime] = useState(settings?.sortTimezonesByTime ?? false);

  const input = useDateInput ? dateInput : textInput;

  // Set datetime-local input to current date on first render
  useEffect(() => {
    setDateInput(buildDateTimeInputFormat());
    setHasRendered(true);
  }, []);

  // Add text/date input to the URL searchParams
  useEffect(() => {
    const url = new URL(window.location.href);

    // If searchParamStateDisabled is true, remove the input searchParam
    if (searchParamStateDisabled) {
      url.searchParams.delete("input");
    } else {
      input === "" ? url.searchParams.delete("input") : url.searchParams.set("input", input);
    }

    // Replace the URL with the new URL - The next router triggers a network request, which is not what we want
    // router.replace(url.toString());
    window.history.replaceState({}, "", url.toString());
  }, [textInput, searchParamStateDisabled]);

  let parsedDate = strictMode ? strict.parseDate(input) : parseDate(input);

  // If parsedDate is null, try to parse the input as a timestamp in milliseconds or seconds
  if (!parsedDate) {
    // Parse the input as an integer
    const timestamp = parseInt(textInput);

    // Check if the timestamp is a valid number and doesn't exceed JavaScript's maximum safe integer
    if (!isNaN(timestamp)) {
      // Create a Date object based on the parsed timestamp
      const parsedDateTemp = new Date(timestamp * (timestampParseMilliseconds ? 1 : 1000));
      if (parsedDateTemp.toString() !== "Invalid Date") parsedDate = parsedDateTemp;
    }
  }

  const onTextInput = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    // On text input, set both text input and datetime-local input to the same value (though transformed to a format the datetime-local accepts). Also set useDateInput to false
    const inputValue = typeof e === "string" ? e : e.target.value;
    setTextInput(inputValue);

    // EXPERIMENTAL
    // If the input is a valid number, set the datetime-local input to the parsed timestamp
    const timestamp = /^\d+$/.test(inputValue) ? parseInt(inputValue) : NaN;

    if (!isNaN(timestamp)) {
      const parsedDateTemp = new Date(timestamp * (timestampParseMilliseconds ? 1 : 1000));
      if (parsedDateTemp.toString() !== "Invalid Date") {
        setDateInput(buildDateTimeInputFormat(parsedDateTemp));
        setUseDateInput(false);
        return;
      }
    }
    // END EXPERIMENTAL

    // If the input is not a valid number, set the datetime-local input to the parsed date
    // buildDateTimeInputFormat() builds the string that the datetime-local input accepts.
    // If no date is passed (if parseDate fails), it defaults to the current date
    setDateInput(buildDateTimeInputFormat(parseDate(inputValue)));

    setUseDateInput(false);
  };

  const onDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // On datetime-local input, set both text input and datetime-local input to the same value (but remove the T, otherwise parseDate thinks it's UTC). Also set useDateInput to true
    setTextInput(e.target.value.replace("T", " "));
    setDateInput(e.target.value.replace("T", " "));
    setUseDateInput(true);
  };

  if (!hasRendered) return null;

  return (
    <>
      {/* Inputs */}
      <div className="mb-3 flex flex-wrap justify-between gap-2">
        <input
          className="flex-1 rounded-md border border-black/50 p-2 text-xl text-black data-[current-input=false]:border-dashed dark:border-white/50 dark:bg-neutral-950 dark:text-white"
          type="text"
          aria-label="A text input field that chooses what date to show on the website."
          data-current-input={!useDateInput}
          placeholder={["next friday at 6pm", "tomorrow at noon", "in 2 days at 7pm", "in 1 day 2 hours"][Math.floor(Math.random() * 4)]}
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

      <hr className="my-4 border-neutral-900 dark:border-neutral-300" />

      {/* Settings & Info */}
      <Settings
        showOnlyDiscordTimestamps={showOnlyDiscordTimestamps}
        setshowOnlyDiscordTimestamps={setshowOnlyDiscordTimestamps}
        timeTickingDisabled={timeTickingDisabled}
        setTimeTickingDisabled={setTimeTickingDisabled}
        searchParamStateDisabled={searchParamStateDisabled}
        setSearchParamStateDisabled={setSearchParamStateDisabled}
        timestampParseMilliseconds={timestampParseMilliseconds}
        setTimestampParseMilliseconds={setTimestampParseMilliseconds}
        useDateInput={useDateInput}
        strictMode={strictMode}
        setStrictMode={setStrictMode}
        use24HourFormat={use24HourFormat}
        setUse24HourFormat={setUse24HourFormat}
        sortTimezonesByTime={sortTimezonesByTime}
        setSortTimezonesByTime={setSortTimezonesByTime}
      />

      <hr className="my-4 border-neutral-900 dark:border-neutral-300" />

      <div className="flex flex-col gap-1">
        {!showOnlyDiscordTimestamps && <BasicInfoDisplay parsedDate={parsedDate} timeTickingDisabled={timeTickingDisabled} />}

        <DiscordTimestampsDisplay parsedDate={parsedDate} open={showOnlyDiscordTimestamps} timeTickingDisabled={timeTickingDisabled} />

        {!showOnlyDiscordTimestamps && <TimezoneDisplay parsedDate={parsedDate} use24HourFormat={use24HourFormat} sortTimezonesByTime={sortTimezonesByTime} />}
      </div>
    </>
  );
};

export default Main;
