import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/message-form.css";

const MessageForm = ({ messages }) => {
  const [input, setInput] = useState("");

  const state = useSelector((state) => state);
  const conversation = state.conversation;
  const user = state.user;

  const sendMessage = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/messages/create", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        message: input,
        conversation: conversation.conversation,
        timestamp: new Date().toLocaleDateString,
      }),
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <>
      <div className="chat">
        <div className="chat__header">
          <Avatar className="avatar" />
          <div className="chat__header-info">
            <h3> Contractors</h3>
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
                  message.username === user.username ? "message__sent" : ""
                }`}
              >
                <span className="chat__name">{message.username}</span>
                {message.message}
                <span className="chat__timestamp">{message.timestamp}</span>
              </p>
            );
          })}
        </div>
        <div className="chat__footer">
          <InsertEmoticonIcon style={{ marginRight: "10px" }} />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              type="text"
            />
            <button
              onClick={sendMessage}
              style={{ marginLeft: "10px" }}
              type="submit"
            >
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
