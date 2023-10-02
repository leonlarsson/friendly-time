"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default ({ params: { time } }: { params: { time: string } }) => {
  //   useEffect(() => {
  //     const newUrl = new URL("https://friendly-time.com/");
  //     newUrl.searchParams.set("input", decodeURIComponent(time));
  //     return redirect(newUrl.toString());
  //   });

  return <h1>{time}</h1>;
};
