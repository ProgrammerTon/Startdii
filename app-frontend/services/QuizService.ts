import { baseUrl } from "@/constants/const";

type QuizRespond = {};

type QuizRequest = {};

type Question = {
  question: string;
  qType: "choice" | "fill";
  choices: [] | string[];
  answers: number[] | number;
};

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

export async function ratingQuiz(id: string, userId: string, score: number) {
  const res = await fetch(`${baseUrl}/quizs/${id}/rating`, {
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

export async function createQuiz(
  userId: string,
  title: string,
  description: string,
  tags: string[],
  questions: Question[]
) {
  const res = await fetch(`${baseUrl}/quizs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ownerId: userId,
      title,
      description,
      tags,
      questions,
    }),
  });
  if (!res.ok) {
    return null;
  }
  const result = await res.json();
  return result;
}
