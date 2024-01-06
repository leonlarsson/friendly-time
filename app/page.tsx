import { Toaster } from "react-hot-toast";
import Main from "./components/Main";
import { Metadata } from "next";

type Props = {
  searchParams: {
    input?: string;
  };
};

export const generateMetadata = ({ searchParams: { input } }: Props): Metadata => {
  return {
    openGraph: {
      title: "Friendly Time Parser",
      description: "Get various date formats from a human-friendly input.",
      url: "https://friendly-time.com",
      siteName: "Friendly Time Parser",
      locale: "en-US",
      type: "website",
      images: [
        {
          url: input ? `/og?input=${encodeURIComponent(input ?? "")}` : "/og",
          width: 900,
          height: 600,
        },
      ],
    },
  };
};

export default function Home() {
  return (
    <main className="mb-5 w-full max-w-4xl">
      <h1 className="text-4xl font-black">Friendly Time</h1>
      <div className="mb-4">Input your desired date/time through natural language or use the date/time selector to see information. Easily convert to a variety of timezones and Discord timestamps.</div>

      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "#111827",
            border: "1px solid #1F2937",
            color: "#F9FAFB",
          },
        }}
      />
      <Main />
    </main>
  );
}
