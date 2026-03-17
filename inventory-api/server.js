require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const { dbConnect } = require('./src/config/db');

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    dbConnect();
    console.log(`Server is running on http://localhost:${port}`);
});