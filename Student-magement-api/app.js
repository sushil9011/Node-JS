const express = require('express');
const connectDB = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(express.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);

const PORT = 7000; // Port set to 7000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
