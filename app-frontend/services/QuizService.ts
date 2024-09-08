import { baseUrl } from "@/constants/const";

type QuizRespond = {};

type QuizRequest = {};

// export async function createGuild(data: GuildRequest): Promise<any | null> {
//   const res = await fetch(`${baseUrl}/sources`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   const result = await res.json();
//   if (!res.ok) {
//     return null;
//   }
//   return result;
// }

export async function getQuiz(
  offset: number,
  sortOrder: "asc" | "desc"
): Promise<any[] | null> {
  const res = await fetch(
    `${baseUrl}/quizs?offset=${offset}&sortOrder=${sortOrder}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    return null;
  }
  const data: any[] = await res.json();
  return data;
}

export async function findQuiz(id: string): Promise<any> {
  const res = await fetch(`${baseUrl}/quizs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return null;
  }
  const data: any = await res.json();
  return data;
}
