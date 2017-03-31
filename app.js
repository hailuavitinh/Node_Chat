var express = require("express");
//var passport = require("passport");
//var config_auth = require("./config/auth.js");
//var GoogleStrategy = require("passport-google-oauth2").Strategy;

var socketio = require("socket.io");

var app = express();
var port = process.env.PORT || 3005;
app.use(express.static(__dirname + "/public"));

app.set("view engine","ejs");

// passport.serializeUser(function(user,done){
//     console.log("passport.serializeUser: ",user);
//     console.log("passport.serializeUser: - done ",done);
//     done(null,user);
// });

// passport.deserializeUser(function(obj,done){
//     console.log("passport deserializeUser: ",obj);
//     console.log("passport.deserializeUser: - done",done);
//     done(null,obj);
// })

// passport.use(new GoogleStrategy({
//     clientID: config_auth.googleAuth.clientID,
//     clientSecret: config_auth.googleAuth.clientSecret,
//     callbackURL: config_auth.googleAuth.callbackURL
// },function(accessToken,refreshToken,profile,done){
//     process.nextTick(function(){
//         return done(null,profile);
//     })
// }))

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

