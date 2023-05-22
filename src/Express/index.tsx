const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Anslut till MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected…'))
    .catch(err => console.log(err));

// Middleware för att tolka JSON-data
app.use(express.json());

// Definiera dina rutter här
app.post('/channels', (req, res) => {
    // Skapa en ny kanal
});

app.get('/channels/:id', (req, res) => {
    // Hämta meddelanden för en kanal
});

app.post('/channels/:id/messages', (req, res) => {
    // Skicka ett nytt meddelande till en kanal
});

// Starta servern
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
