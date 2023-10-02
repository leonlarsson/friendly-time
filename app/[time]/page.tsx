import { redirect } from "next/navigation";

export default ({ params: { time } }: { params: { time: string } }) => {
  const newUrl = new URL("https://friendly-time.com/");
  newUrl.searchParams.set("input", time);
  return redirect(newUrl.toString());
};
