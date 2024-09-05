import { baseUrl } from "@/constants/const";
import { getCurrentToken } from "@/utils/asyncstroage";

type SourceRespond = {};

type SourceRequest = {
  ownerId: string;
  title: string;
  description?: string;
  content?: string;
  published?: boolean;
  tags?: string[];
};

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

export async function getSource(
  offset: number
): Promise<SourceRespond[] | null> {
  const res = await fetch(`${baseUrl}/sources?offset=${offset}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: SourceRespond[] = await res.json();
  if (!res.ok) {
    return null;
  }
  return data;
}

export async function findSource(id: string): Promise<SourceRespond | null> {
  const res = await fetch(`${baseUrl}/sources/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: SourceRespond = await res.json();
  if (!res.ok) {
    return null;
  }
  return data;
}
