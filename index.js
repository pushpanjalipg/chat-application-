const express = require('express')
const http=require('http')
const path = require('path')
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server);
console.log(io);
io.on("connection", function (socket) {
  console.log("user connected");
  socket.on("message",function(message){
socket.broadcast.emit("message",message)
  });
  socket.on("new-user-join",name=>{
Users[socket.id] =name;
socket.broadcast.emit("user-joined",name)
  })
});
app.use(express.static(path.join('./public')))
app.set('view engine','hbs')
app.get('/',(req,res)=>{
    res.render("index")
})
server.listen(8000,function(){
    console.log("server is listening on port 8000");
})