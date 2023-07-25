import ticketModel from "./Mongo/models/ticket.model.js";

class ticketMongoDao {
    constructor(){}

    //creat ticket

    async createTicket(ticketData) {
        try {
            const ticketToPush = await ticketModel.create(ticketData);
            console.log("ticket creado");
            return ticketToPush;
        } catch (error) {
            return error;
        }
    }
}

export default ticketMongoDao;

//orden data code, purchase_datetime, amount, purchaser