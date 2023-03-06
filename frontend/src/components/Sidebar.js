import React, { useState } from "react";
import "../styles/sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const state = useSelector((state) => state);
  const user = state.user;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.image} />
        <div className="sidebar__headerRight"></div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__search-container">
          <SearchIcon />
          <input
            placeholder="Search"
            type="text"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat search={search} />
      </div>
    </div>
  );
};

export default Sidebar;
