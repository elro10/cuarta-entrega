import { Router } from "express";
import { chatCapture } from "../Controller/chat.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

const chatRouter = Router();

chatRouter.get("/",authenticate("authJWT"), authorize("admin"), chatCapture);


export {chatRouter};