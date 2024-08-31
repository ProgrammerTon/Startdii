import { baseUrl } from "@/constants/const";

export async function fetchChat(
  room: string,
  offset: number
): Promise<any | null> {
  //offset start 1
  try {
    const res = await fetch(`${baseUrl}/chat/${room}?offset=${offset}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    console.log(result);
    if (res.ok) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Fetch Chat", error);
  }
}
