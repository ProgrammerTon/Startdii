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
  console.log('getusergoal', data);
  return data;
}

export async function addUserExp(userId: string, expToAdd: number) {
  const res = await fetch(`${baseUrl}/levels/${userId}/${expToAdd}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    console.error("Failed to add EXP", await res.text());
    return null;
  }
  const data = await res.json()
  return data;
}

export async function addGoalProgress(userId: string, goalType: string) {
  const res = await fetch(`${baseUrl}/progressions/${userId}/${goalType}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    console.error("Failed to progress quest", await res.text());
    return null;
  }
  const data = await res.json()
  return data;
}