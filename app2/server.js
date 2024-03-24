// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/memoGP', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// Aggiungi queste righe nel file server.js

app.use(express.json());

// Definisci il modello per le memorie
const Memory = mongoose.model('Memory', {
    name: String,
    amount: Number,
    date: Date
});

// Rotta per aggiungere una memoria
app.post('/addMemory', async (req, res) => {
    const { name, amount, date } = req.body;
    
    const newMemory = new Memory({ name, amount, date });
    await newMemory.save();
    
    res.send('Memory added successfully');
});

// Rotta per ottenere tutte le memorie
app.get('/memories', async (req, res) => {
    const memories = await Memory.find();
    res.json(memories);
});