import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { TouchableHighlight } from "react-native";
import socket from "../hooks/socket";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const joinRoom = () => {
    if (room) {
      socket.emit("joinRoom", room);
    }
  };

  const leaveRoom = () => {
    if (room) {
      socket.emit("leaveRoom", room);
    }
  };

  const sendMessage = () => {
    if (message && room) {
      socket.emit("newMessage", JSON.stringify({ rooms: room, message }));
      setMessage("");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Room"
        value={room}
        onChangeText={setRoom}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TouchableHighlight
        onPress={joinRoom}
        className="bg-green-600 p-2 rounded-xl h-10"
      >
        <Text className="text-lg">Join Room</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={leaveRoom}
        className="bg-green-600 p-2 rounded-xl h-10"
      >
        <Text className="text-lg">Leave Room</Text>
      </TouchableHighlight>
      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        style={{ marginTop: 20, marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TouchableHighlight
        onPress={sendMessage}
        className="bg-green-600 p-2 rounded-xl h-10"
      >
        <Text className="text-lg">Send Message</Text>
      </TouchableHighlight>
      <View style={{ marginTop: 20 }}>
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
      </View>
    </View>
  );
};

export default ChatComponent;
