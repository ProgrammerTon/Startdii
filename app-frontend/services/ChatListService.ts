import { baseUrl } from "@/constants/const";
import { getCurrentToken } from "@/utils/asyncstroage";

export async function addChatList(
  ownerId: string,
  userId: string
): Promise<any | null> {
  if (userId === ownerId) {
    return null;
  }
  const res = await fetch(`${baseUrl}/users/chatlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ownerId,
      userId,
    }),
  });
  const result = await res.json();
  if (res.ok) {
    return result;
  } else {
    return null;
  }
}

export async function getChatList() {
  const token = await getCurrentToken();
  const res = await fetch(`${baseUrl}/users/chatlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data: any = await res.json();
  if (!res.ok) {
    return null;
  }
  return data;
}

export async function findChatList(chatId:string) {
  const token = await getCurrentToken();
  const res = await fetch(`${baseUrl}/users/chatlist/${chatId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data: any = await res.json();
  if (!res.ok) {
    return null;
  }
  return data;
}
