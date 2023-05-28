import React, { useState } from "react";

const ChatWindow = ({ currentUser, selectedUser, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() === "") return; // Hantera tomt meddelande
    const newMessage = {
      sender: currentUser,
      recipient: selectedUser,
      text: message,
      timestamp: new Date().getTime(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage(""); // Rensa meddelandefältet
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  return (
    <div>
      <h2>Chat with {selectedUser}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === currentUser ? "sent" : "received"
            }`}
          >
            <p>{msg.text}</p>
            <span className="timestamp">{formatTimestamp(msg.timestamp)}</span>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <button className="close-button" onClick={onClose}>
        Close Chat
      </button>
    </div>
  );
};

export default ChatWindow;
