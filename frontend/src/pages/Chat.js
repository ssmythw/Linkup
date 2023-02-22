import React from "react";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";

const Chat = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <Sidebar />
        </div>
        <div className="col-md-8">
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default Chat;
