import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";

function SidebarChat({ addNewChat }) {
  //Set state for random avatar:
  const [seed, setSeed] = useState("");
  // Each time SidebarChat component loads, useEffect gets triggered in order to make randomnumbers, then we setSeed to whatever random number was generated, and it brings the string concatenation for the API call
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, []);

  //Function to create chat when clicked:

  const createChat = () => {
    const roomName = prompt("Please enter a name for the chat room: ");

    if (roomName) {
      // do some stuff in db
    }
  };

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat...</h2>
    </div>
  );
}

export default SidebarChat;
