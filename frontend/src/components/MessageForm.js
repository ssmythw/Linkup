import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useState } from "react";
import "../styles/message-form.css";

const MessageForm = ({ messages }) => {
  const [input, setInput] = useState();

  const sendMessage = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/messages/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
        name: "DEMO APP",
        timestamp: "Just now",
        received: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInput("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="chat">
        <div className="chat__header">
          <Avatar className="avatar" />
          <div className="chat__header-info">
            <h3>Channel Name</h3>
            <p>Last seen at...</p>
          </div>
          <div className="chat__header-right">
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="chat__body">
          {messages?.map((message) => {
            return (
              <p
                className={`chat__message ${
                  message.received ? "message__sent" : ""
                }`}
              >
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timestamp">{message.timestamp}</span>
              </p>
            );
          })}
        </div>
        <div className="chat__footer">
          <InsertEmoticonIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              type="text"
            />
            <button onClick={sendMessage} type="submit">
              Send a message
            </button>
          </form>
          <MicIcon />
        </div>
      </div>
    </>
  );
};

export default MessageForm;
