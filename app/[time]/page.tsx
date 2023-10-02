"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default ({ params: { time } }: { params: { time: string } }) => {
  // Redirect to the main page after this page actually loads
  // This is to allow the OG image to still be generated
  useEffect(() => {
    const newUrl = new URL("https://friendly-time.com/");
    newUrl.searchParams.set("input", decodeURIComponent(time));
    return redirect(newUrl.toString());
  });
};
