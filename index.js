const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8888;

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, "./build")));

app.get("/slave", (req, res) => {
  res.sendFile(path.join(__dirname+'/slave/index.html'));
});

io.on("connection", (socket) => {
  socket.on("demoChange", msg => {
    // Echo message to connected clients
    io.emit("demoChange", msg);
  });

  socket.on("demo", msg => {
    io.emit("demo", msg);
  });
});

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});