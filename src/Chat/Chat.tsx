import React, { useState, useEffect } from "react";
import { auth, db } from "../DB/firebase";
import { collection, getDocs } from "firebase/firestore";
import ChatWindow from "./ChatWindow";
import "./chat.css"; 

const Chat = () => {
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Hämta aktuell användare vid komponentens montering
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  // Hämta alla användare från databasen
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
    // Här kan du hantera att skicka meddelandet, till exempel genom att ringa ett API eller uppdatera någon global state
    console.log(message);
    setMessage(""); // Rensa textfältet
  };

  const handleStartChat = (email) => {
    // Hantera start av chatt med den valda användaren
    setSelectedUser(email);
  };

  return (
    <div>
      <h1>Welcome, {userEmail}</h1>

      <h2>Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.email}{" "}
            <button onClick={() => handleStartChat(user.email)}>
              Start Chat
            </button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <ChatWindow
          currentUser={userEmail}
          selectedUser={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      <ul id="messages">
        {/* Här kan du rendera meddelanden som kommer från din server eller state */}
      </ul>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
