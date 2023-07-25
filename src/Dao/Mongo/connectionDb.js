import mongoose from "mongoose";
import { options } from "../../config/config.js";
//conexion a mongo
const mongoDbPass = options.mongo.url
class ConnectionDb{
    static #instance;
    constructor(){
        mongoose.connect(mongoDbPass);
    }
    static async getInstance(){
        if (ConnectionDb.#instance) {
            console.log("ya estabas conectado");
            return ConnectionDb.#instance
        } else {
            this.#instance = new ConnectionDb();
            console.log("nueva conexion a Mongodb");
            return this.#instance;
        }
    }
}


export {ConnectionDb};