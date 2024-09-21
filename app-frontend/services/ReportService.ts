import { baseUrl } from "@/constants/const";

export async function reportToAdmin({
  token,
  targetId,
  option,
  reason,
  description,
}: {
  token: string;
  targetId: string;
  option: "user" | "source" | "quiz";
  reason: string;
  description: string;
}): Promise<any> {
  if (!token) {
    throw Error("Token Needed!");
  }
  const res = await fetch(`${baseUrl}/reports/${targetId}?option=${option}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reason, description }),
  });
  if (res.status === 404) {
    console.log("User not found (404).");
    return null; // or return a specific message or throw an error
  }

  if (!res.ok) {
    console.error("Fetch error:", res.status, res.statusText);
    return null;
  }

  const data: any = await res.json();
  return data;
}
