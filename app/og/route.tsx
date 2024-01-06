import { ImageResponse } from "next/og";
import { parseDate } from "chrono-node";
import { getDiscordTimestamps, getParsedDateFormats, getTimezones } from "../utils";

export const runtime = "edge";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  // Font stuff
  const regularFontUrl = new URL("../../public/fonts/Inter-Regular.ttf", import.meta.url);
  // const boldFontUrl = new URL("../../public/fonts/Inter-Bold.ttf", import.meta.url);
  const regularFont = fetch(regularFontUrl).then(res => res.arrayBuffer());
  // const boldFont = fetch(boldFontUrl).then(res => res.arrayBuffer());
  const [regularFontData /* boldFontData */] = await Promise.all([regularFont /* boldFont */]);

  const times = ["now", "tomorrow", "next tuesday at 6am", "last friday"];
  const randomIndex = Math.floor(Math.random() * times.length);

  const parsedDate = parseDate(decodeURIComponent(input ?? ""));
  const dateData = getParsedDateFormats(parsedDate);
  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center text-center font-normal bg-white">
        <div tw="text-5xl font-bold">Friendly Time</div>
        <div tw="text-2xl px-6 mb-4">Easily convert human-friendly time inputs into various date formats, timezones, and Discord timestamps.</div>

        {/* No input, render main OG image. Else, render input-specific OG image  */}
        {!input ? (
          <div tw="flex flex-col">
            {times.map((time, i) => (
              <div key={time} tw="flex flex-col w-full">
                <div tw="flex flex-row items-center justify-center my-1">
                  <div tw="bg-transparent w-72 border-black border text-black p-2 rounded-md">{time}</div>
                  <span tw="mx-2 text-3xl">{"»"}</span>
                  <div tw="">{parseDate(time).toUTCString()}</div>
                </div>

                {i === randomIndex && <span tw="text-lg underline">Discord timestamps:</span>}
                {i === randomIndex &&
                  Object.entries(getDiscordTimestamps(parseDate(time)))
                    .filter(([key]) => ["Long Time", "Short Date/Time", "Relative Time"].includes(key))
                    .map(([key, value]) => (
                      <div key={key} tw="flex">
                        <div tw="flex">
                          {key}: {value.value} = {value.result}
                        </div>
                      </div>
                    ))}
                {i === randomIndex && <div tw="mb-4"></div>}
              </div>
            ))}
          </div>
        ) : (
          <div tw="flex flex-col px-12 w-full">
            <div tw="bg-transparent text-xl w-full border-black border text-black p-2 rounded-md mb-3">{decodeURIComponent(input ?? "")}</div>

            <span tw="text-4xl text-center flex">{dateData.Relative ?? "Invalid time"}</span>
            <span tw="text-xl text-center flex">Sydney: {getTimezones(parsedDate, false, false, "Sydney")[0].result ?? "Invalid time"}</span>
            <span tw="text-xl text-center flex">Stockholm: {getTimezones(parsedDate, true, false, "Stockholm")[0].result ?? "Invalid time"}</span>
            <span tw="text-xl text-center flex">UTC: {dateData["UTC Date"] ?? "Invalid time"}</span>
            <span tw="text-xl text-center flex">New York: {getTimezones(parsedDate, false, false, "New York")[0].result ?? "Invalid time"}</span>
            <span tw="text-xl text-center flex">Los Angeles: {getTimezones(parsedDate, false, false, "Los Angeles")[0].result ?? "Invalid time"}</span>
          </div>
        )}

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
          weight: 400,
        },
        // {
        //   name: "Inter",
        //   data: boldFontData,
        //   weight: 700
        // }
      ],
    },
  );
};
