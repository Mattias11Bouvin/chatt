import React, { useState, useRef, useEffect } from "react";
import { getDatabase, ref, onValue, push, set } from "firebase/database";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    width: "100%",
    border: "1px solid grey",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#36393f",
    [theme.breakpoints.up("sm")]: {
      width: "500px",
    },
  },
  header: {
    backgroundColor: "#40444b",
    color: "#dcddde",
    padding: "10px",
    fontSize: "18px",
  },
  messages: {
    flex: "1 1 auto",
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  },
  message: {
    maxWidth: "80%",
    borderRadius: "15px",
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: "#1778f2",
    color: "#fff",
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#40444b",
    color: "#dcddde",
  },
  inputArea: {
    display: "flex",
    backgroundColor: "#40444b",
    padding: "10px",
    alignItems: "center",
  },
  input: {
    flex: "1 1 auto",
    borderRadius: "15px",
    padding: "10px",
    color: "#dcddde",
    backgroundColor: "#202225",
    outline: "none",
    border: "none",
  },
  sendButton: {
    marginLeft: "10px",
    padding: "10px 20px",
    backgroundColor: "#1778f2",
    borderRadius: "15px",
    color: "#fff",
    cursor: "pointer",
    border: "none",
  },
  closeButton: {
    backgroundColor: "#f04747",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
  },
}));

const ChatWindow = ({ currentUser, selectedUser, onClose }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, "messages"); // adjust this to your path
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      let loadedMessages = [];
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        loadedMessages.push({ ...data, id: childSnapshot.key });
      });
      setMessages(loadedMessages);
    });

    return () => {
      unsubscribe(); // clean up on unmount
    };
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const newMessage = {
      sender: currentUser,
      recipient: selectedUser,
      text: message,
      timestamp: new Date().getTime(),
    };

    try {
      const db = getDatabase();
      const messagesRef = ref(db, "messages");
      const newMessageRef = push(messagesRef); // Generate a new unique ID
      await set(newMessageRef, { ...newMessage, id: newMessageRef.key }); // Save the new message with the generated ID
      setMessage("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>Chat with {selectedUser}</div>
      <div className={classes.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${classes.message} ${
              msg.sender === currentUser ? classes.sent : classes.received
            }`}
          >
            <p>{msg.text}</p>
            <span>{formatTimestamp(msg.timestamp)}</span>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <div className={classes.inputArea}>
        <input
          className={classes.input}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button
          className={classes.sendButton}
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          Send
        </button>
      </div>
      <button className={classes.closeButton} onClick={onClose}>
        Close Chat
      </button>
    </div>
  );
};

export default ChatWindow;
