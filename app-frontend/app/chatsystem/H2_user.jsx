import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const ArchiveMainPage = () => {
  const [messages, setMessages] = useState([
    { text: "สวัสดีครับท่านสมาชิกชมรม", time: "12:48", sender: "user" },
    { text: "สวัสดีครับท่านประธาน", time: "12:48", sender: "receiver" },
    { text: "รู้เขารู้เรา", time: "12:49", sender: "user" },
    { text: "รบร้อยครั้ง", time: "12:50", sender: "user" },
    { text: "แพ้ร้อยครั้ง", time: "12:51", sender: "receiver" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { text: input, time: new Date().toLocaleTimeString().slice(0, 5), sender: "receiver" };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View key={index} style={[styles.messageContainer, message.sender === "user" ? styles.userMessage : styles.receiverMessage]}>
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArchiveMainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0'
  },
  receiverMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e1ffc7'
  },
  messageText: {
    fontSize: 16
  },
  messageTime: {
    fontSize: 12,
    color: '#555',
    alignSelf: 'flex-end'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  }
});
