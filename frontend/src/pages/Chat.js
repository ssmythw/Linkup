import React from "react";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
import "../styles/chat.css";

const Chat = () => {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <MessageForm />
      </div>
    </div>
  );
};

export default Chat;
