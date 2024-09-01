const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const { chatbot } = require('./services/openaiService');
const socketService = require("./services/socketService")
require('dotenv').config();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});




// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// chatbot()

// Use Routes

app.use('/api/v1', require('./routes/rootRoute'));


io.on('connection', socket => {
  console.log("connection success")
  socketService(socket, io);
})


app.set('socket', io);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
