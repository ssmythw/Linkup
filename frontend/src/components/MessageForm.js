import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React from "react";
import "../styles/message-form.css";

const MessageForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <p className="chat__message">
            <span className="chat__name">Scott</span>
            This is a message
            <span className="chat__timestamp">{new Date().toUTCString()}</span>
          </p>
          <p className="chat__message chat__receiver">
            <span className="chat__name">Scott</span>
            This is a message
            <span className="chat__timestamp">{new Date().toUTCString()}</span>
          </p>
        </div>
        <div className="chat__footer">
          <InsertEmoticonIcon />
          <form>
            <input placeholder="Type a message" type="text" />
            <button type="submit">Send a message</button>
          </form>
          <MicIcon />
        </div>
      </div>
    </>
  );
};

export default MessageForm;
