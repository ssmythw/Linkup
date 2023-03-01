import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useRef, useState } from "react";
import "../styles/message-form.css";

const MessageForm = ({ messages }) => {
  const [input, setInput] = useState();

  const sendMessage = (e) => {
    e.preventDefault();
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
