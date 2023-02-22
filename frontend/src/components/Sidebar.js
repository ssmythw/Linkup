import React from "react";

const Sidebar = () => {
  const channels = ["Channel 1", "Channel 2", "Channel 3"];

  return (
    <>
      <h2>Available Channels</h2>
      <ul className="list-group">
        {channels.map((channel, i) => {
          return <li className="list-group-item">{channel}</li>;
        })}
      </ul>
      <h2>Users</h2>
    </>
  );
};

export default Sidebar;
