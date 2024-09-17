import { baseUrl } from "@/constants/const";

type SourceRespond = {};

type SourceRequest = {
  ownerId: string;
  title: string;
  description?: string;
  content?: string;
  published?: boolean;
  tags?: string[];
};

export async function createSource(data: SourceRequest): Promise<any | null> {
  const res = await fetch(`${baseUrl}/sources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    return null;
  }
  return result;
}

export async function getSource(
  offset: number,
  sortOrder: "asc" | "desc",
  title: string | null
): Promise<SourceRespond[] | null> {
  if (!title) {
    title = "";
  }
  const res = await fetch(
    `${baseUrl}/sources?offset=${offset}&sortOrder=${sortOrder}&title=${title}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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

export async function ratingSource(id: string, userId: string, score: number) {
  console.log(`${baseUrl}/sources/${id}/rating`);
  const res = await fetch(`${baseUrl}/sources/${id}/rating`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score, raterId: userId }),
  });
  if (!res.ok) {
    return null;
  }
  const result = await res.json();
  return result;
}

export async function favoriteSource(id: string, userId: string): Promise<any | null> {
  const res = await fetch(`${baseUrl}/users/favorite_sources/add/${userId}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
  const result = await res.json();
  if (!res.ok) {
    return null;
  }
  return result;
}

export async function unfavoriteSource(id: string, userId: string): Promise<any | null> {
  const res = await fetch(`${baseUrl}/users/favorite_sources/remove/${userId}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
  const result = await res.json();
  if (!res.ok) {
    return null;
  }
  return result;
}

export async function getFavoriteSource(userId: string): Promise<any[] | null> {
  const res = await fetch(`${baseUrl}/users/favorite_sources/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const result: any[] = await res.json();
  if (!res.ok) {
    return null;
  }
  return result;
}
