var express = require("express");
var socketio = require("socket.io");

var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public"));

app.set("view engine","ejs");

var io = socketio.listen(app.listen(port));

io.sockets.on('connection',function(socket){
    socket.emit("message",{message:'welcome to the chat'});
    socket.on("send",function(data){
        console.log(socket);
        io.sockets.emit('message',data);
    });
});

app.get("/",function(req,res){
    res.render("index");
})


// app.listen(port,function(){
//     console.log("Express Server started ....");
// });

