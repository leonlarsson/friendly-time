import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);

export const getParsedDateFormats = (date: Date | null) => ({
  Local: date?.toString(),
  "UTC Date": date?.toUTCString(),
  "ISO Date": date?.toISOString(),
  "Day of the Month": date?.getDate(),
  "Month of the Year": date ? date?.getMonth() + 1 : null,
  Year: date?.getFullYear(),
  Week: date ? getWeekNumber(date) : null,
  "Timestamp (milliseconds)": date?.getTime(),
  "Timestamp (seconds)": date ? Math.floor(date?.getTime() / 1000) : null
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
    .filter(x => [x.city, x.code].some(y => y.toLowerCase().includes(filter.toLowerCase())))
    .map(timezone => ({
      city: timezone.city,
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

// Timezones sorted by UTC offset
const timezones = [
  { city: "Auckland", code: "Pacific/Auckland" },
  { city: "Sydney", code: "Australia/Sydney" },
  { city: "Tokyo", code: "Asia/Tokyo" },
  { city: "Singapore", code: "Asia/Singapore" },
  { city: "Hong Kong", code: "Asia/Hong_Kong" },
  { city: "Seoul", code: "Asia/Seoul" },
  { city: "Dubai", code: "Asia/Dubai" },
  { city: "Moscow", code: "Europe/Moscow" },
  { city: "Istanbul", code: "Europe/Istanbul" },
  { city: "Berlin", code: "Europe/Berlin" },
  { city: "Stockholm", code: "Europe/Stockholm" },
  { city: "Paris", code: "Europe/Paris" },
  { city: "Amsterdam", code: "Europe/Amsterdam" },
  { city: "Brussels", code: "Europe/Brussels" },
  { city: "Rome", code: "Europe/Rome" },
  { city: "Madrid", code: "Europe/Madrid" },
  { city: "London", code: "Europe/London" },
  { city: "Cairo", code: "Africa/Cairo" },
  { city: "Rio de Janeiro", code: "America/Sao_Paulo" },
  { city: "New York", code: "America/New_York" },
  { city: "Chicago", code: "America/Chicago" },
  { city: "Mexico City", code: "America/Mexico_City" },
  { city: "Los Angeles", code: "America/Los_Angeles" },
  { city: "Honolulu", code: "Pacific/Honolulu" }
];
