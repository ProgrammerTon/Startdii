import { baseUrl } from "@/constants/const";

type UserRespond = {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: string[];
};

export async function registerUser(
  email: string,
  password: string,
  username: string,
  firstname: string,
  lastname: string
): Promise<any | null> {
  const res = await fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      username: username,
      firstname: firstname,
      lastname: lastname,
    }),
  });
  const result = await res.json();
  if (res.ok) {
    return result;
  } else {
    return null;
  }
}

export async function getUserByUsername(username: string) {
  const res = await fetch(`${baseUrl}/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: any = await res.json();
  if (!res.ok) {
    return null;
  }
  return data;
}

export async function getUser(token: string): Promise<any> {
  if (!token) {
    throw new Error("Token Needed");
  }
  const res = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
  console.log("User Data from fetch", data);
  return data;
}

export async function getQuizHistory(token: string): Promise<any> {
  if (!token) {
    throw Error("Token Needed!");
  }
  const res = await fetch(`${baseUrl}/users/quiz_history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

export async function getSourceInventory(userId: string) {
  const res = await fetch(`${baseUrl}/users/${userId}/sources`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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

export async function getQuizInventory(userId: string) {
  const res = await fetch(`${baseUrl}/users/${userId}/quizs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
