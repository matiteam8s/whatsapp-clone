import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "../../config/firebase";
import { Link } from "react-router-dom";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, []);

  const [lastmessage, setLastMessage] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setLastMessage(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

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
          <p>{lastmessage[0]?.message}</p>
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
