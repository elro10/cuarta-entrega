import { ChatModel } from "./Mongo/models/chat.model.js";

class ChatMongoDao {
    constructor(){
    }
async addMessage(object){
    try {
        const data = await ChatModel.create(object);
        const response = JSON.parse(JSON.stringify(data));
        return response;
    } catch (error) {
        return error;
    }
}

async getMessages(){
    try {
        const data = await ChatModel.find();
        const response = JSON.parse(JSON.stringify(data));
        return response
    } catch (error) {
        return error
    }
}
    
}

export default ChatMongoDao