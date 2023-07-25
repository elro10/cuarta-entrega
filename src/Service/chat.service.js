import ChatMongoDao from "../Dao/chat.dao.js";


const chatManager = new ChatMongoDao();

export const getMessages = async () => {
    const messages = await chatManager.getMessages();
    return messages;
}

export const addMessage = async (data) =>{
    const newMessage = await chatManager.addMessage(data);
    console.log(newMessage);
    const messages = await chatManager.getMessages();
    return messages
}