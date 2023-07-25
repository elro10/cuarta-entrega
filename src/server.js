//imports de paquetes
import express from "express";
import { urlencoded } from "express";
import path from "path"
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import swaggerUi from "swagger-ui-express";

//imports de propio
import { options } from "./config/config.js";
import { ConnectionDb } from "./Dao/Mongo/connectionDb.js";
import { __dirname } from "./utils/utils.js";
import { designsRouter } from "./Routes/designs.routes.js";
import { cartRouter } from "./Routes/cart.routes.js";
import { userRouter } from "./Routes/user.routes.js";
import { initializePassport } from "./config/passport.config.js";
import { webRouter } from "./Routes/web.routes.js";
import { chatRouter } from "./Routes/chat.routes.js";
import {ioSocketLaunch} from "./sockets/ioSockets.sockets.js"
import { mockRouter } from "./Routes/mockDesigns.routes.js";
import { errorHandler } from "./middlewares/ErrorsHandler.js";
import { addLogger, logger } from "./utils/logger.js";
import { swaggerOptions } from "./config/docConfig.js";
import swaggerJSDoc from "swagger-jsdoc";

//express
const app = express();
const port = options.server.port;

//logger
app.use(addLogger);

//connections port/se exporta pare visualizar en sockets
export const httpServer = app.listen(port, () => console.log(`Server listening on port ${port}`));
logger.info(port)

//websocket desde externo
// ioSocket(httpServer);
// ioSocketLunch();

//midles de Node
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../../public"));
//cors config
app.use(
  cors( {origin:"http://127.0.0.1:3000", credentials: true})
);
app.use(cookieParser());

//eerror
app.use(errorHandler);

//HBS plantillas
app.engine(".hbs",handlebars.engine({extname: '.hbs'}));
app.set('views',path.join(__dirname, "../views"));
app.set("view engine", ".hbs");


//configuracion de passport
initializePassport();
app.use(passport.initialize());

//rutas Principales
app.use("/",webRouter);
app.use("/api/designs", designsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/mockingdesigns", mockRouter);
//rutas secundarias
app.use("/chat", chatRouter);
//ruta Documentacion
const spects = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(spects));


//test cors
app.get("/test", async (req, res) => {
  res.send({ payload: "respuesta" });
});

//test logger
app.get("/loggerTest", async (req,res) => {
  req.logger.debug("nivel debug");
  req.logger.http("nivel http");
  req.logger.info("nivel info");
  req.logger.warning("nivel warn");
  req.logger.error("nivel error");
  req.logger.fatal("nivel fatal");
  res.send("prueba niveles")
})


//connection mongo
const dbInstance = ConnectionDb.getInstance();
