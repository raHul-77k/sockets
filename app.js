const http = require("http");
const path = require('path');
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server)


//socket.io
io.on('connection', (socket)=>{
    socket.on('user-message', (message) => {
        console.log("A  new User Message", message);
        io.emit("message", message);
    })
});


server.listen(9000,() => console.log('Server started at PORT:9000'))

app.use(express.static(path.resolve("./public")));

app.get('/',(req, res) => {
    return res.sendFile('./public/index.html')
})