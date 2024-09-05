import { baseUrl } from "@/constants/const";
import { getCurrentToken } from "@/utils/asyncstroage";

export async function getCommentsSource(sourceId: string) {
  const res = await fetch(`${baseUrl}/comments/${sourceId}?option=source`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    return null;
  }
  const result = await res.json();
  return result;
}

export async function createCommentSource(
  sourceId: string | null,
  quizId: string | null,
  content: string
): Promise<any | null> {
  const data = {
    content,
  };
  const targetId = sourceId ? sourceId : quizId;
  const option = sourceId ? "source" : "quiz";
  const token = await getCurrentToken();
  const res = await fetch(`${baseUrl}/comments/${targetId}?option=${option}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  console.log(res);
  if (!res.ok) {
    return null;
  }
  const result = await res.json();
  return result;
}
