import React, { createContext, useContext, useEffect, useState } from "react";
import { guildDetail } from "../services/GuildService";
import { Alert } from "react-native";

const GuildContext = createContext();
export const useGuildContext = () => useContext(GuildContext);

const GuildProvider = ({ children }) => {
  const [guildId, setGuildId] = useState("");
  const [guild, setGuild] = useState(null);
  const [userRole, setUserRole] = useState("member");

  const loadGuild = () => {
    const data = guildDetail(guildId);
    guildDetail(guildId)
      .then((res) => {
        if (res) {
          setGuild(res);
        } else {
          Alert.alert("Failed to Fetch Guild");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (guildId !== "") {
      loadGuild();
    }
  }, [guildId]);

  return (
    <GuildContext.Provider
      value={{
        guild,
        setGuild,
        setGuildId,
        loadGuild,
      }}
    >
      {children}
    </GuildContext.Provider>
  );
};

export default GuildProvider;
