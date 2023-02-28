import { Avatar } from "@material-ui/core";
import React, { useRef } from "react";
import "../styles/sidebarchat.css";
import { setChannel } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";

const SidebarChat = () => {
  const channelName = useRef();
  const channel = useSelector((state) => state.channel);

  const dispatch = useDispatch();

  const setChannel = () => {
    console.log("here");
    console.log(channelName.current.innerHTML);
  };

  return (
    <div className="sidebar-chat">
      <Avatar />
      <div className="sidebar-chat__info" onClick={setChannel}>
        <h2 ref={channelName}>Contractors</h2>
        <p>Last message in the channel</p>
      </div>
    </div>
  );
};

export default SidebarChat;
