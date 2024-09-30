export const baseUrl: string =
  process.env.NODE_ENV === "development"
    ? "https://data.236sec.org"
    : "https://otherurl";
