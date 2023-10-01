import { parseDate } from "chrono-node";
import { ImageResponse } from "next/server";
import { getDiscordTimestamps } from "./utils";

export const runtime = "edge";

const times = ["now", "tomorrow", "next tuesday at 6am", "last friday"];

export default async () => {
  const regularFont = fetch(new URL("/public/fonts/Inter-Regular.ttf", import.meta.url)).then(res => res.arrayBuffer());
  //   const boldFont = fetch(new URL("/public/fonts/Inter-Bold.ttf", import.meta.url)).then(res => res.arrayBuffer());
  const [regularFontData /* boldFontData */] = await Promise.all([regularFont /* boldFont */]);

  const randomIndex = Math.floor(Math.random() * times.length);

  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center text-center font-normal bg-white">
        <div tw="text-5xl font-bold">Friendly Time</div>
        <div tw="text-2xl px-6 mb-4">Easily convert human-friendly time inputs into various date formats, timezones, and Discord timestamps.</div>

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
