window.onload = function(){
    var message = [];
    var socket = io.connect('192.168.1.23:8080',{reconnect:!1,
        secure:true,
        "force new connection":!0,
        transports:["websocket","polling"]
    });
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");


    socket.on('message',function(data){
        if(data.message){
            message.push(data.message);
            var html = '';
            for(var i = 0;i<message.length;i++){
                html += message[i] + '<br/>';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:",data);
        }
    });

    sendButton.onclick = function(){
        var text = field.value;
        socket.emit('send',{message:text});
    };

}