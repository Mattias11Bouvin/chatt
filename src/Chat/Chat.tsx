import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../DB/firebase";
import { collection, getDocs } from "firebase/firestore";
import ChatWindow from "./ChatWindow";
import Channels from "../Channel/Channels";
import "./Chat.css";
import { FaComments, FaTasks, FaQuestionCircle,FaFileAlt, FaCalendar   } from "react-icons/fa";

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
        <h4>Welcome, {userEmail}</h4>
        <div className="icon-container task-icon-container">
          <Link to="/Taskboard" className="icon">
            <FaTasks className="task-icon" />
          </Link>
          <div className="icon-text">Board</div>
        </div>
        <div className="icon-container calendar-icon-container">
          <Link to="/Calendar" className="icon">
            <FaCalendar className="calendar-icon" />
          </Link>
          <div className="icon-text">Calendar</div>
        </div>
        <div className="icon-container faq-icon-container">
          <Link to="/Faq" className="icon">
            <FaQuestionCircle className="task-icon" />
          </Link>
          <div className="icon-text">Faq</div>
        </div>
        <div className="icon-container document-icon-container">
          <Link to="/Document" className="icon">
            <FaFileAlt className="document-icon" />
          </Link>
          <div className="icon-text">Document</div>
        </div>

        <div
          className="icon-container chat-icon-container"
          onClick={handleDropdownToggle}
        >
          <FaComments className="icon" />
          <div className="icon-text">Chat</div>
        </div>

        <Channels channels={[]} onAddChannel={handleAddChannel} />
        

        {isDropdownOpen && (
          <ul className={`chat-list ${selectedUser ? "hidden" : ""}`}>
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
