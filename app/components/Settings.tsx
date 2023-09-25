type Props = {
  useDateInput: boolean;
  strictMode: boolean;
  setStrictMode: (value: boolean) => void;
  use24HourFormat: boolean;
  setUse24HourFormat: (value: boolean) => void;
  sortTimezonesByTime: boolean;
  setSortTimezonesByTime: (value: boolean) => void;
};

export default ({ useDateInput, strictMode, setStrictMode, use24HourFormat, setUse24HourFormat, sortTimezonesByTime, setSortTimezonesByTime }: Props) => {
  return (
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
  );
};
