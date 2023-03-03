import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
import "../styles/chat.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const conversationState = useSelector((state) => state.conversation);
  const conversation = conversationState.conversation;
  const socket = io("http://localhost:8080");
  socket.on("receive-message", (message) => {
    setMessages([...messages, message]);
  });
  useEffect(() => {
    // get all the messages for the current conversation
    fetch("http://localhost:8080/messages", {
      method: "POST",
      body: JSON.stringify({
        conversation,
      }),
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((messages) => {
        setMessages(messages);
      });
  }, [conversation]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <MessageForm messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default Chat;
