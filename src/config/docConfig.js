import { __dirname } from "../utils/utils.js";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

export const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion Shop-seeker",
            description:"API pensada para centralizar distintas tiendas POD"
        }
    },
    apis:[`${path.join(__dirname,`../docs/**/*.yaml`)}`]
}