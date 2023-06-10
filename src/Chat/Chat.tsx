import React, { useState, useEffect } from "react";
import { auth, db } from "../DB/firebase";
import { collection, getDocs } from "firebase/firestore";
import ChatWindow from "./ChatWindow";
import Channels from "../Channel/Channels";
import "./chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const fetchUsers = async () => {
    const usersCollectionRef = collection(db, "users");
    const snapshot = await getDocs(usersCollectionRef);
    const fetchedUsers = snapshot.docs.map((doc) => doc.data());
    setUsers(fetchedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSend = () => {
    console.log(message);
    setMessage("");
  };

  const handleStartChat = (email) => {
    setSelectedUser(email);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddChannel = (channelName) => {
    // Lägg till den nya kanalen till kanallistan
    setChannels((prevChannels) => [...prevChannels, channelName]);
  };

  //...
  return (
    <div className="chat-container">
      <div className="user-list">
        <h1>Welcome, {userEmail}</h1>
        <Channels channels={[]} onAddChannel={handleAddChannel} />
        <div onClick={handleDropdownToggle} className="dropdown-toggle">
          <p className="dm">Direct messages {isDropdownOpen ? "▲" : "▼"}</p>
        </div>
        {isDropdownOpen && (
          <ul>
            {users.map((user, index) => (
              <li className="user-list-item" key={index}>
                <div
                  className="user-email"
                  onClick={() => handleStartChat(user.email)}
                >
                  {user.email}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="chat-window-container">
        {selectedUser && (
          <ChatWindow
            currentUser={userEmail}
            selectedUser={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
        <ul id="messages">{/* Render messages here */}</ul>
      </div>
    </div>
  );
};

export default Chat;
