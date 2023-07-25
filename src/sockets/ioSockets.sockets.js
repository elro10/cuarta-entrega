//imports app
import { Server } from "socket.io";
//imports propios
import { addMessage, getMessages } from "../Service/chat.service.js";
import { httpServer } from "../server.js";

export const ioSocket = (server) => {
  const io = new Server(server);
  io.on("connection", async(socket) => {
    console.log("nuevo cliente conectado");
    //se envia historial de entrada
    const messages = await getMessages();
    socket.emit("msgHistory", messages);
    //captura
    socket.on("message", async(data) =>{
      await addMessage(data);
      const messages = await getMessages();
      socket.emit("msgHistory", messages);
    });
  });
}

export const ioSocketLaunch = ()=>{
    ioSocket(httpServer);
}