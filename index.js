const server = require("http").Server();
const port = 5000;

var io = require("socket.io")(server);
var users = [];
var msgs = [];

io.on("connection", function(socket){
    console.log("Connection established");
    
    socket.on("l_username", function(data){
        console.log("Hail and well met, "+ data + "!");
        users.push(data);
        
        io.emit("userList", users);
    });
    
    socket.on("sendChat", function(data){
        console.log("A message has been sent to the server.");
        msgs.push(data);
        
        console.log(msgs)
        io.emit("msgSent", msgs);
        
    });
    
    socket.on("disconnect", function(){
        console.log("A user has disconnected.")
    });
    
});

server.listen(port, (err)=>{
    if(err){
        console.log("Error: "+err);
        return false;
    }
    console.log("The socket port has been opened, adventurer!")
})