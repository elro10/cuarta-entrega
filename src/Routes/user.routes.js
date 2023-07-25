import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { changeRoleCapture, documents, forgotPassCapture, loginCapture, logoutCapture, picTest, profileCall, resetPasswordCapture, signInCapture } from "../Controller/user.controller.js";
import { uploaderDocuments, uploaderProfile } from "../utils/multer.js";

const userRouter = Router();

//rutas users
userRouter.post("/signin",signInCapture);
userRouter.post("/login", loginCapture);
userRouter.get("/profile",authenticate("authJWT"), profileCall);
userRouter.post("/logout",authenticate("authJWT"), logoutCapture);
userRouter.post("/forgot-password", forgotPassCapture);
userRouter.post("/reset-password", resetPasswordCapture);
userRouter.put("/premium/:uid", authenticate("authJWT"), changeRoleCapture);
userRouter.post("/:uid/documents", uploaderDocuments.fields([{name:"identificacion",maxCount:1}, {name:"domicilio",maxCount:1},{name:"estadoDeCuenta",maxCount:1}]), documents);
//ruta test
userRouter.post("/pic", authenticate("authJWT"), uploaderProfile.single("avatar"), picTest);

export{userRouter};