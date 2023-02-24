import { Avatar } from "@material-ui/core";
import React from "react";
import "../styles/sidebarchat.css";

const SidebarChat = () => {
  return (
    <div className="sidebar-chat">
      <Avatar />
      <div className="sidebar-chat__info">
        <h2>Channel Name</h2>
        <p>Last message in the channel</p>
      </div>
    </div>
  );
};

export default SidebarChat;
