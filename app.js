const express = require("express");
const https = require("https");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const cors = require('cors')
const app = express();
app.use(index);
app.use(cors());


const server = https.createServer(app);
const io = socketIo(server).listen(server);
require('./service-log/logging-format')
io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "https://wpe1.net/api/argy/v1/history"
    );
    socket.emit("FromAPI", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));