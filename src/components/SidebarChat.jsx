import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "../firebase";
import { Link } from "react-router-dom";

function SidebarChat({ addNewChat, id, name }) {
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
      // add a new room to firestore db:
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          {/* taken from room.data.name (firebase collection for rooms) */}
          <h2>{name}</h2>
          <p>Last message...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat...</h2>
    </div>
  );
}

export default SidebarChat;
