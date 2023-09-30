// Timezones sorted by UTC offset
export default [
  { city: "Auckland", code: "Pacific/Auckland", country: "New Zealand" },
  { city: "Sydney", code: "Australia/Sydney", country: "Australia" },
  { city: "Tokyo", code: "Asia/Tokyo", country: "Japan" },
  { city: "Seoul", code: "Asia/Seoul", country: "South Korea" },
  { city: "Perth", code: "Australia/Perth", country: "Australia" },
  { city: "Singapore", code: "Asia/Singapore", country: "Singapore" },
  { city: "Hong Kong", code: "Asia/Hong_Kong", country: "Hong Kong" },
  { city: "Beijing", code: "Asia/Shanghai", country: "China" },
  { city: "Shanghai", code: "Asia/Shanghai", country: "China" },
  { city: "Kolkata", code: "Asia/Kolkata", country: "India" },
  { city: "Dubai", code: "Asia/Dubai", country: "United Arab Emirates" },
  { city: "Moscow", code: "Europe/Moscow", country: "Russia" },
  { city: "Istanbul", code: "Europe/Istanbul", country: "Turkey" },
  { city: "Kyiv", code: "Europe/Kiev", country: "Ukraine" },
  { city: "Cairo", code: "Africa/Cairo", country: "Egypt" },
  { city: "Nairobi", code: "Africa/Nairobi", country: "Kenya" },
  { city: "Riyadh", code: "Asia/Riyadh", country: "Saudi Arabia" },
  { city: "Berlin", code: "Europe/Berlin", country: "Germany" },
  { city: "Stockholm", code: "Europe/Stockholm", country: "Sweden" },
  { city: "Paris", code: "Europe/Paris", country: "France" },
  { city: "Amsterdam", code: "Europe/Amsterdam", country: "Netherlands" },
  { city: "Brussels", code: "Europe/Brussels", country: "Belgium" },
  { city: "Rome", code: "Europe/Rome", country: "Italy" },
  { city: "Madrid", code: "Europe/Madrid", country: "Spain" },
  { city: "Johannesburg", code: "Africa/Johannesburg", country: "South Africa" },
  { city: "London", code: "Europe/London", country: "United Kingdom" },
  { city: "Rio de Janeiro", code: "America/Sao_Paulo", country: "Brazil" },
  { city: "Sao Paulo", code: "America/Sao_Paulo", country: "Brazil" },
  { city: "Buenos Aires", code: "America/Argentina/Buenos_Aires", country: "Argentina" },
  { city: "New York", code: "America/New_York", country: "United States" },
  { city: "Toronto", code: "America/Toronto", country: "Canada" },
  { city: "Chicago", code: "America/Chicago", country: "United States" },
  { city: "Mexico City", code: "America/Mexico_City", country: "Mexico" },
  { city: "Vancouver", code: "America/Vancouver", country: "Canada" },
  { city: "Los Angeles", code: "America/Los_Angeles", country: "United States" },
  { city: "Honolulu", code: "Pacific/Honolulu", country: "United States" }
] satisfies Timezone[];

type Timezone = {
  city: string;
  code: string;
  country: string;
};
