import Input from "./components/Input";

export default function Home() {
  return (
    <main className="w-full max-w-4xl">
      <h1 className="text-4xl font-black">Friendly Time</h1>
      <div className="mb-4">Input your desired date/time through natural language or use the date/time selector to see information and timezones.</div>

      <Input />
    </main>
  );
}
