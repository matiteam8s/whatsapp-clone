import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "../../config/firebase";
import { useSelector } from "react-redux";
import { bool, func, number, string } from "prop-types";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  item: {
    borderBottom: "1px solid #FAFAFA",
    height: "70px",
    backgroundColor: "#FFF",
  },
  roomName: {
    fontWeight: "600 !important",
  },
}));

function SidebarChat({
  addNewChat,
  id,
  name,
  index,
  handleListItemClick,
  selectedIndex,
}) {
  const [lastmessage, setLastMessage] = useState([]);
  const classes = useStyles();

  const user = useSelector((state) => state.auth.user);

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

  const createChat = () => {
    const roomName = prompt("Please enter a name for the chat room: ");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        createdBy: user.uid,
      });
    }
  };

  const initials = name?.split(" ").map((i) => i.charAt(0).toUpperCase());

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <ListItem
        button
        disableRipple
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, index)}
        className={classes.item}
      >
        <ListItemAvatar>
          <Avatar>
            {initials[0]}
            {initials[1]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{ primary: classes.roomName }}
          primary={name}
          secondary={lastmessage[0]?.message}
        />
      </ListItem>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat...</h2>
    </div>
  );
}

export default SidebarChat;

SidebarChat.propTypes = {
  name: string,
  addNewChat: bool,
  id: string,
  index: number,
  handleListItemClick: func,
  selectedIndex: number,
};
