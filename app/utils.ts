import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const getDiscordTimestamps = (date: Date | null) => ({
  "Short Time": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:t>` : null,
    result: dayjs(date).format("hh:mm A")
  },
  "Long Time": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:T>` : null,
    result: dayjs(date).format("hh:mm:ss A")
  },
  "Short Date": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:d>` : null,
    result: dayjs(date).format("MM/YY/YYYY")
  },
  "Long Date": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:D>` : null,
    result: dayjs(date).format("MMMM D, YYYY")
  },
  "Short Date/Time": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:f>` : null,
    result: dayjs(date).format("MMMM D, YYYY hh:mm A")
  },
  "Long Date/Time": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:F>` : null,
    result: dayjs(date).format("dddd, MMMM D, YYYY hh:mm A")
  },
  "Relative Time": {
    value: date ? `<t:${Math.floor(date.getTime() / 1000)}:R>` : null,
    result: date ? dayjs(date).fromNow() : "Invalid Date"
  }
});

export const getWeekNumber = (date: Date): string => {
  const d: Date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart: Date = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNumber: number = Math.ceil(((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7);
  return weekNumber.toString();
};
