import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../utils/asyncstroage";
import socket from "../hooks/socket";
import { fetchChat } from "../services/ChatService";

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

  const fetchMessage = async (room, offset) => {
    if (room) {
      const chats = await fetchChat(room, offset);
      if (!chats) {
        return;
      }
      chats.forEach((chat) => {
        chat.time = new Date(chat.time).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
      });
      setMessages((prevMessages) => [...prevMessages, ...chats]);
      return chats;
    }
  };

  const sendMessage = ({
    room,
    text,
    sender,
    type,
    time,
    sourceId,
    quizId,
  }) => {
    //type can be "Text" "Source" "Quiz"
    socket.emit(
      "newMessage",
      JSON.stringify({
        rooms: room,
        text,
        sender,
        type,
        time,
        sourceId,
        quizId,
      })
    );
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

    const handleNewMessage = async (message) => {
      try {
        const newMessage = JSON.parse(message); // Synchronously parse the JSON string
        newMessage.time = new Date(newMessage.time).toLocaleTimeString(
          "en-GB",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );
        console.log("New", newMessage);
        setMessages((prevMessages) => [newMessage, ...prevMessages]); // Add the new message to state
      } catch (error) {
        console.error("Failed to parse message:", error);
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
        setMessages,
        joinRoom,
        leaveRoom,
        sendMessage,
        fetchMessage,
        clearMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
