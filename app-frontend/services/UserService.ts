import { baseUrl } from "@/constants/const";

async function registerUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<any | null> {
  const res = await fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
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

export default {
  registerUser,
};
