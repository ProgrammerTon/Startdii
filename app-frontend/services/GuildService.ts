import { baseUrl } from "@/constants/const";
import { getCurrentToken } from "@/utils/asyncstroage";

export async function guildList() {
  const token = await getCurrentToken();
  const res = await fetch(`${baseUrl}/users/guild`, {
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

export async function guildDetail(guildId: string) {
  const res = await fetch(`${baseUrl}/guilds/${guildId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return null;
  }
  try {
    const data: any = await res.json();
    console.log("Guild Detailed :", data);
    return data;
  } catch (error) {
    return null;
  }
}

export async function promoteViceLeader(
  guildId: string,
  userId: string,
  option: string
) {
  // option = add / remove
  const res = await fetch(
    `${baseUrl}/guilds/${guildId}/vice-leader/${userId}?option=${option}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    return null;
  }
  try {
    const data: any = await res.json();
    console.log("Member Left:", data);
    return data;
  } catch (error) {
    return null;
  }
}

export async function kickMember(guildId: string, userId: string) {
  // option = add / remove
  const res = await fetch(
    `${baseUrl}/guilds/${guildId}/member/${userId}?option=remove`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    return null;
  }
  try {
    const data: any = await res.json();
    console.log("Member Left:", data);
    return data;
  } catch (error) {
    return null;
  }
}

export async function kickViceLeader(guildId: string, userId: string) {
  // option = add / remove
  const res = await fetch(
    `${baseUrl}/guilds/${guildId}/vice-leader/${userId}?option=remove`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    return null;
  }
  try {
    const data: any = await res.json();
    console.log("Member Left:", data);
    return data;
  } catch (error) {
    return null;
  }
}

export async function joinGuildByCode(inviteCode: string) {
  const token = await getCurrentToken();
  const res = await fetch(`${baseUrl}/guilds/joinGuild/${inviteCode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return null;
  }
  try {
    const data: any = await res.json();
    console.log("Join Guild", data);
    return data;
  } catch (error) {
    return null;
  }
}
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
