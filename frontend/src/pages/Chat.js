import React from "react";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
import "../styles/chat.css";

const Chat = ({ messages }) => {
  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <MessageForm messages={messages} />
      </div>
    </div>
  );
};

export default Chat;
