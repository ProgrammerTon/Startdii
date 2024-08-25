import { baseUrl } from "@/constants/const";

async function loginUser(email: string, password: string): Promise<any | null> {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (res.ok) {
    const { access_token } = await res.json();
    console.log(access_token);
    return access_token;
  }
  return null;
}

export default {
  loginUser,
};
