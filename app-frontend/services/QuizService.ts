import { baseUrl } from "@/constants/const";
import { getCurrentToken } from "@/utils/asyncstroage";

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
  sortOrder: "asc" | "desc",
  title: string | null,
  tags: string[],
  activeFilter: string
): Promise<any[] | null> {
  if (!title) {
    title = "";
  }
  console.log(activeFilter, sortOrder);
  if (activeFilter === "Latest" || activeFilter === "Oldest") {
    const res = await fetch(
      `${baseUrl}/quizs?offset=${offset}&sortOrder=${sortOrder}&title=${title}&tags=${tags}&sortBy=time`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: any[] = await res.json();
    if (!res.ok) {
      return null;
    }
    return data;
  }
  if (activeFilter === "Rating") {
    const res = await fetch(
      `${baseUrl}/quizs?offset=${offset}&sortOrder=${sortOrder}&title=${title}&tags=${tags}&sortBy=rating`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: any[] = await res.json();
    if (!res.ok) {
      return null;
    }
    return data;
  }
  return null;
}

// export async function getQuiz(
//   offset: number,
//   sortOrder: "asc" | "desc",
//   title: string | null
// ): Promise<any[] | null> {
//   if (!title) {
//     title = "";
//   }
//   const res = await fetch(
//     `${baseUrl}/quizs?offset=${offset}&sortOrder=${sortOrder}&title=${title}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   if (!res.ok) {
//     return null;
//   }
//   const data: any[] = await res.json();
//   return data;
// }

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

export async function favoriteQuiz(
  id: string,
  userId: string
): Promise<any | null> {
  const res = await fetch(
    `${baseUrl}/users/favorite_quizzes/add/${userId}/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }
  );
  const result = await res.json();
  if (!res.ok) {
    return null;
  }
  return result;
}

export async function unfavoriteQuiz(
  id: string,
  userId: string
): Promise<any | null> {
  const res = await fetch(
    `${baseUrl}/users/favorite_quizzes/remove/${userId}/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }
  );
  const result = await res.json();
  if (!res.ok) {
    return null;
  }
  return result;
}

export async function getFavoriteQuiz(userId: string): Promise<any[] | null> {
  const res = await fetch(`${baseUrl}/users/favorite_quizzes/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const result: any[] = await res.json();
  if (!res.ok) {
    return null;
  }
  return result;
}

export async function submitQuiz(
  quizId: string,
  userId: string,
  userAnswer: number[]
): Promise<any[] | null> {
  const res = await fetch(`${baseUrl}/quizs/${quizId}/${userId}/submit`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ans: userAnswer,
    }),
  });
  const result: any[] = await res.json();
  if (!res.ok) {
    return null;
  }
  return result;
}

export async function getAnswers(quizId: string): Promise<any[] | null> {
  const token = await getCurrentToken();
  if (!token) {
    throw Error("Token Needed!");
  }
  const res = await fetch(`${baseUrl}/users/answerQuiz/${quizId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result: any[] = await res.json();
  if (!res.ok) {
    return null;
  }
  return result;
}

export async function getUserRatingQuiz(
  userId: string,
  quizId: string
): Promise<any[] | null> {
  const res = await fetch(`${baseUrl}/users/${userId}/rating/quiz/${quizId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const result: any = await res.json();
  if (!res.ok) {
    return null;
  }
  return result;
}

export async function deleteQuiz(quizId: string): Promise<boolean> {
  const res = await fetch(`${baseUrl}/quizs/${quizId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    return true; 
  } else {
    console.error("Failed to delete:", await res.text());
    return false; 
  }
}
