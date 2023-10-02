import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezones from "./timezones";

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);

export const getParsedDateFormats = (date: Date | null, ogImage?: boolean) => ({
  ...(ogImage ? undefined : { Local: date?.toString() }),
  "UTC Date": date?.toUTCString(),
  "ISO Date": date?.toISOString().toString(),
  "Day of the Month": date?.getDate().toString(),
  "Month of the Year": date ? (date?.getMonth() + 1).toString() : null,
  Year: date?.getFullYear().toString(),
  Week: date ? getWeekNumber(date) : null,
  "Timestamp (milliseconds)": date?.getTime().toString(),
  "Timestamp (seconds)": date ? Math.floor(date?.getTime() / 1000).toString() : null
});

export const getDiscordTimestamps = (date: Date | null) => ({
  "Short Time": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:t>` : null,
    result: dayjs(date).format("h:mm A")
  },
  "Long Time": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:T>` : null,
    result: dayjs(date).format("h:mm:ss A")
  },
  "Short Date": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:d>` : null,
    result: dayjs(date).format("MM/DD/YYYY")
  },
  "Long Date": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:D>` : null,
    result: dayjs(date).format("MMMM D, YYYY")
  },
  "Short Date/Time": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:f>` : null,
    result: dayjs(date).format("MMMM D, YYYY h:mm A")
  },
  "Long Date/Time": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:F>` : null,
    result: dayjs(date).format("dddd, MMMM D, YYYY h:mm A")
  },
  "Relative Time": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:R>` : null,
    result: date ? dayjs(date).fromNow() : "Invalid Date"
  }
});

export const getTimezones = (date: Date | null, use24HourFormat: boolean, sortByTime: boolean, filter: string) =>
  (sortByTime ? timezones : [...timezones].sort((a, b) => a.city.toLowerCase().localeCompare(b.city.toLowerCase())))
    .filter(x => [x.city, x.code, x.country].some(y => y.toLowerCase().includes(filter.toLowerCase())))
    .map(timezone => ({
      city: timezone.city,
      country: timezone.country,
      code: timezone.code,
      result: date
        ? dayjs(date)
            .tz(timezone.code)
            .format(`dddd, MMMM D, YYYY ${use24HourFormat ? "HH" : "h"}:mm ${use24HourFormat ? "" : "A"} z (UTC Z)`)
        : null
    }));

export const getWeekNumber = (date: Date): string => {
  const d: Date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart: Date = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNumber: number = Math.ceil(((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7);
  return weekNumber.toString();
};

export const buildDateTimeInputFormat = (date?: Date): string => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!date) date = new Date();
  return date.toLocaleString("sv-SE", { timeZone: userTimezone }).slice(0, 19).replace("T", " ");
};
