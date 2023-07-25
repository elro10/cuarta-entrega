//imports de app
import { v4 as uuidv4 } from 'uuid';

//imports propios
import ticketMongoDao from "../Dao/ticket.dao.js";

const ticketMaganer = new ticketMongoDao()

export const createNewTicket = async (
    cart, userId, designs
) => {
    const newTicket = {
        code: uuidv4(),
        purchase_datetime: new Date(),
        cartId: cart,
        designs: designs,
        purchaser: userId,
    }
    console.log(newTicket);
    //se desactiva para test
    const ticketCreated = ticketMaganer.createTicket(newTicket);
    return newTicket
}