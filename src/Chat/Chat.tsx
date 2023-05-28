import React, { useState } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Här kan du hantera att skicka meddelandet, till exempel genom att ringa ett API eller uppdatera någon global state
    console.log(message);
    setMessage(''); // Rensa textfältet
  };

  return (
    <div>
      <h1>Chat Room</h1>

      <ul id="messages">
        {/* Här kan du rendera meddelanden som kommer från din server eller state */}
      </ul>

      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message"
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chat;
