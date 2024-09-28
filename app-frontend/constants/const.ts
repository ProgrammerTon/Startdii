export const baseUrl: string =
  process.env.NODE_ENV === "development"
    ? "http://192.168.1.144:3000"
    : "https://otherurl";
