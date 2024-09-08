import { baseUrl } from "@/constants/const";
import { getCurrentToken } from "@/utils/asyncstroage";
import { Alert } from "react-native";

type GuildRequest = {
  name: string, 
  description: string, 
  cover: number,
};

export async function createGuild(userId: string, data: GuildRequest): Promise<any | null> {
  const res = await fetch(`${baseUrl}/guilds/${userId}`, {
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
    return data;
  } catch (error) {
    console.log(error);
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

export async function leaveAdmin(userId: string) {
  //
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

export async function leavePerson(
  userId: string,
  members: any[],
  guildId: string
) {
  const userleave = members.find((user) => user._id === userId);
  let data;
  if (userleave.isAdmin) {
    Alert.alert("Admin Cant Leave Right now");
    return;
    data = await kickViceLeader(guildId, userId);
    if (!data) {
      Alert.alert("Kick Failed");
      return;
    }
    data = await kickViceLeader(guildId, userId);
    if (!data) {
      Alert.alert("Kick Failed");
      return;
    }
    data = await kickMember(guildId, userId);
  }
  if (userleave.isViceAdmin) {
    data = await kickViceLeader(guildId, userId);
    if (!data) {
      Alert.alert("Kick Failed");
      return;
    }
    data = await kickMember(guildId, userId);
  }
  if (!userleave.isAdmin && !userleave.isViceAdmin) {
    data = await kickMember(guildId, userId);
  }
  console.log(data);
  if (!data) {
    Alert.alert("Kick Failed");
    return;
  } else {
    Alert.alert("Kick!!");
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
