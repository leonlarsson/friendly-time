import { ImageResponse } from "next/server";
import { parseDate } from "chrono-node";
import { getParsedDateFormats } from "../utils";

export const runtime = "edge";

export default async ({ params: { time }, searchParams }: { params: { time: string }; searchParams: { time?: string } }) => {
  console.log("hello");

  console.log(searchParams);

  const regularFont = fetch(new URL("/public/fonts/Inter-Regular.ttf", import.meta.url)).then(res => res.arrayBuffer());
  //   const boldFont = fetch(new URL("/public/fonts/Inter-Bold.ttf", import.meta.url)).then(res => res.arrayBuffer());
  const [regularFontData /* boldFontData */] = await Promise.all([regularFont /* boldFont */]);

  const parsedDate = parseDate(decodeURIComponent(time));

  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center text-center font-normal bg-white">
        <div tw="text-5xl font-bold">Friendly Time</div>
        <div tw="text-2xl px-6 mb-4">Easily convert human-friendly time inputs into various date formats, timezones, and Discord timestamps.</div>

        <div tw="flex flex-col px-12 w-full">
          <div tw="bg-transparent text-xl w-full border-black border text-black p-2 rounded-md mb-3">{decodeURIComponent(time)}</div>
          {Object.entries(getParsedDateFormats(parsedDate, true)).map(([key, value]) => (
            <span key={key} tw="flex text-lg">
              {key}: <span tw="ml-1">{value ?? "Invalid Date"}</span>
            </span>
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
