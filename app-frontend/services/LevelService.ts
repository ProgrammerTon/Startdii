import { baseUrl } from "@/constants/const";

export async function getUserLevel(userId: string): Promise<any | null> {
  const res = await fetch(`${baseUrl}/levels/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    console.error("Failed to get user level data", await res.text());
    return null;
  }
  const data = await res.json()
  return data;
}

export async function getUserGoal(userId: string): Promise<any | null> {
  const res = await fetch(`${baseUrl}/progressions/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    console.error("Failed to get user goal data", await res.text());
    return null;
  }
  const data = await res.json()
  console.log("getusergoal", data);
  return data;
}