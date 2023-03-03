import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/message-form.css";
import { io } from "socket.io-client";

const MessageForm = ({ messages, setMessages }) => {
  const [input, setInput] = useState("");

  const state = useSelector((state) => state);
  const conversation = state.conversation;
  const user = state.user;
  const socket = io("http://localhost:8080");

  useEffect(() => {
    const body = document.getElementById("chat__body");
    body.scrollTop = body.scrollHeight;
  }, [messages, conversation]);

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
    })
      .then((res) => res.json())
      .then((message) => {
        socket.emit("send-message", message);
        setMessages([...messages, message]);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="chat">
        <div className="chat__header">
          <div
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "10px",
              backgroundColor: "lightgrey",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
            }}
          >
            #
          </div>
          <div className="chat__header-info">
            <h3>{state.conversation.conversation}</h3>
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
        <div className="chat__body" id="chat__body">
          {messages?.map((message, i) => {
            return (
              <p
                key={i}
                className={`chat__message ${
                  message.username === user.username ? "message__sent" : ""
                }`}
              >
                <span key={i + 1} className="chat__name">
                  {message.username}
                </span>
                {message.message}
                <span key={i + 2} className="chat__timestamp">
                  {message.timestamp}
                </span>
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
              style={{
                marginLeft: "10px",
                backgroundColor: "white",
                border: "none",
              }}
              type="button"
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
