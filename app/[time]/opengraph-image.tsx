import { ImageResponse } from "next/og";
import { parseDate } from "chrono-node";
import { getParsedDateFormats, getTimezones } from "../utils";

export const runtime = "edge";

export default async ({ params: { time } }: { params: { time: string } }) => {
  const regularFont = fetch(new URL("/public/fonts/Inter-Regular.ttf", import.meta.url)).then(res => res.arrayBuffer());
  //   const boldFont = fetch(new URL("/public/fonts/Inter-Bold.ttf", import.meta.url)).then(res => res.arrayBuffer());
  const [regularFontData /* boldFontData */] = await Promise.all([regularFont /* boldFont */]);

  const parsedDate = parseDate(decodeURIComponent(time));
  const dateData = getParsedDateFormats(parsedDate);

  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center text-center font-normal bg-white">
        <div tw="text-5xl font-bold">Friendly Time</div>
        <div tw="text-2xl px-6 mb-4">Easily convert human-friendly time inputs into various date formats, timezones, and Discord timestamps.</div>

        <div tw="flex flex-col px-12 w-full">
          <div tw="bg-transparent text-xl w-full border-black border text-black p-2 rounded-md mb-3">{decodeURIComponent(time)}</div>

          <span tw="text-4xl text-center flex">{dateData.Relative ?? "Invalid time"}</span>
          <span tw="text-xl text-center flex">Sydney: {getTimezones(parsedDate, false, false, "Sydney")[0].result ?? "Invalid time"}</span>
          <span tw="text-xl text-center flex">Stockholm: {getTimezones(parsedDate, true, false, "Stockholm")[0].result ?? "Invalid time"}</span>
          <span tw="text-xl text-center flex">UTC: {dateData["UTC Date"] ?? "Invalid time"}</span>
          <span tw="text-xl text-center flex">New York: {getTimezones(parsedDate, false, false, "New York")[0].result ?? "Invalid time"}</span>
          <span tw="text-xl text-center flex">Los Angeles: {getTimezones(parsedDate, false, false, "Los Angeles")[0].result ?? "Invalid time"}</span>
        </div>

        <div tw="flex absolute top-[565px] left-[15px] text-lg">friendly-time.com</div>
      </div>
    ),
    {
      width: 900,
      height: 600,
      fonts: [
        {
          name: "Inter",
          data: regularFontData,
          weight: 400
        }
        // {
        //   name: "Inter",
        //   data: boldFontData,
        //   weight: 800
        // }
      ]
    }
  );
};
