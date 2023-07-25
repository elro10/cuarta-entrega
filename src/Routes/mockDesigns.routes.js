//imports app
import { Router } from "express";
import { captureGetDesignsMock } from "../Controller/mockDesigns.controller.js";
//imports propios

const mockRouter = Router();

//rutas mock

mockRouter.get("/", captureGetDesignsMock);

export {mockRouter}