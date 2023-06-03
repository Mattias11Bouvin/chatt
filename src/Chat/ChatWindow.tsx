import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    width: '500px',
    border: '1px solid grey',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#36393f',
  },
  header: {
    backgroundColor: '#40444b',
    color: '#dcddde',
    padding: '10px',
    fontSize: '18px',
  },
  messages: {
    flex: '1 1 auto',
    overflowY: 'auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  message: {
    maxWidth: '80%',
    borderRadius: '15px',
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#1778f2',
    color: '#fff',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#40444b',
    color: '#dcddde',
  },
  inputArea: {
    display: 'flex',
    backgroundColor: '#40444b',
    padding: '10px',
    alignItems: 'center',
  },
  input: {
    flex: '1 1 auto',
    borderRadius: '15px',
    padding: '10px',
    color: '#dcddde',
    backgroundColor: '#202225',
    outline: 'none',
    border: 'none',
  },
  sendButton: {
    marginLeft: '10px',
    padding: '10px 20px',
    backgroundColor: '#1778f2',
    borderRadius: '15px',
    color: '#fff',
    cursor: 'pointer',
    border: 'none',
  },
  closeButton: {
    backgroundColor: '#f04747',
    color: '#fff',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
  },
}));

const ChatWindow = ({ currentUser, selectedUser, onClose }) => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <div className={classes.header}>Chat with {selectedUser}</div>
      <div className={classes.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${classes.message} ${
              msg.sender === currentUser ? classes.sent : classes.received
            }`}
          >
            <p>{msg.text}</p>
            <span className={classes.timestamp}>{formatTimestamp(msg.timestamp)}</span>
          </div>
        ))}
      </div>
      <div className={classes.inputArea}>
        <input
          className={classes.input}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button className={classes.sendButton} onClick={handleSendMessage}>Send</button>
      </div>
      <button className={classes.closeButton} onClick={onClose}>
        Close Chat
      </button>
    </div>
  );
};

export default ChatWindow;
