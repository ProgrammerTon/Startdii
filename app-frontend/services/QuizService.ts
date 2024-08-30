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

// export async function getSource(
//   offset: number
// ): Promise<SourceRespond[] | null> {
//   const res = await fetch(`${baseUrl}/sources?offset=${offset}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data: SourceRespond[] = await res.json();
//   if (!res.ok) {
//     return null;
//   }
//   return data;
// }

// export async function findSource(id: string): Promise<SourceRespond | null> {
//   const res = await fetch(`${baseUrl}/sources/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data: SourceRespond = await res.json();
//   if (!res.ok) {
//     return null;
//   }
//   return data;
// }
