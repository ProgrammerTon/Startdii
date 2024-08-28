import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../utils/asyncstroage";
import socket from "../hooks/socket";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const joinRoom = (room) => {
    socket.emit("joinRoom", room);
  };

  const leaveRoom = (room) => {
    socket.emit("leaveRoom", room);
  };

  const clearMessage = () => {
    setMessages([]);
  };

  const sendMessage = (room, message) => {
    socket.emit("newMessage", JSON.stringify({ rooms: room, message }));
  };

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    const handleNewMessage = (message) => {
      try {
        console.log(message);
        const newMessage = JSON.parse(message); // Synchronously parse the JSON string
        setMessages((prevMessages) => [...prevMessages, newMessage]); // Add the new message to state
      } catch (error) {
        // console.error("Failed to parse message:", error);
      }
    };
    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        messages,
        joinRoom,
        leaveRoom,
        sendMessage,
        clearMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
