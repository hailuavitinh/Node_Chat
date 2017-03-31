window.onload = function(){
    var message = [];
    var socket = io.connect('http://192.168.1.18:3005');
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