import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "../SidebarChat/SidebarChat";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import db from "../../config/firebase";
import { useSelector } from "react-redux";

function Sidebar() {
  const [rooms, setRooms] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.auth.user);

  const filteredRooms = rooms?.filter((room) => {
    return room.data.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    db.collection("rooms")
      .where("createdBy", "==", user.uid)
      .onSnapshot((snapshot) => {
        const rooms = [];
        snapshot.forEach((doc) => {
          rooms.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRooms(rooms);
      });
  }, []);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined className="muisearch" />
          <input
            type="text"
            placeholder="Search or start new conversation"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {filteredRooms?.map((room, index) => (
          <SidebarChat
            index={index}
            key={room.id}
            id={room.id}
            name={room.data.name}
            handleListItemClick={handleListItemClick}
            selectedIndex={selectedIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
