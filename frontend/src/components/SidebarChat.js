import { Avatar } from "@material-ui/core";
import React, { useRef } from "react";
import "../styles/sidebarchat.css";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const SidebarChat = () => {
  const channelName = useRef();
  const dispatch = useDispatch();

  const setChannel = () => {
    console.log("here");
    console.log(channelName.current.innerHTML);
  };

  return (
    <>
      <div className="title-header">
        <h4 style={{ marginLeft: "10px" }}>Conversations</h4>
        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
      <div className="sidebar-chat">
        <Avatar />
        <div className="sidebar-chat__info" onClick={setChannel}>
          <h5 ref={channelName}>Contractors</h5>
        </div>
      </div>
      <br />
    </>
  );
};

export default SidebarChat;
