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
  sortOrder: "asc" | "desc"
): Promise<SourceRespond[] | null> {
  const res = await fetch(
    `${baseUrl}/sources?offset=${offset}&sortOrder=${sortOrder}`,
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
