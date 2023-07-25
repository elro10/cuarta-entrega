const socket = io();
//inputs
const chatBox = document.getElementById("chatbox");
const emailBox = document.getElementById("emailBox");
const sendtBtn = document.getElementById("sendButton");
//outputs
const divMessages = document.getElementById("historial");

const sendMessage = () =>{
    socket.emit("message", {user:emailBox.value, message:chatBox.value});
    chatBox.value="";
};

chatbox.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){
        sendMessage();
    }
});

sendtBtn.addEventListener("click", (e) =>{
    sendMessage();
})

socket.on("msgHistory", (data) =>{
    divMessages.innerHTML=``;
    data.forEach(element => {
        const parrafo = document.createElement("p");
        parrafo.innerHTML=`${element.user} - message: ${element.message}`;
        divMessages.appendChild(parrafo);
    })
})