//importapp
import jwt from "jsonwebtoken";
import passport from "passport";
import cookieParser from "cookie-parser";
//importPropio
import { signIn, login, getUserToken, chkUserMail, updatePass, updateRole, chkUserId, updateUserDocuService, updateLastConnection } from "../Service/user.service.js";
import { options } from "../config/config.js";
import {CustomError} from "../Service/Error/customError.service.js"
import { generateUserErrorInfo } from "../Service/Error/userErrorInfo.js";
import { EError } from "../enums/EError.js";
import { generateEmailToken, verifyEmailToken } from "../utils/utils.js";
import { sendRecoveryPass } from "../utils/email.js";
import { logger } from "../utils/logger.js";

export const signInCapture = async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  const avatar = req.files[`avatar`]
  //EError
  if (!first_name || !last_name || !email || !age || !password) {
    CustomError.createError({
      name:"User create error",
      cause: generateUserErrorInfo(first_name,last_name,email),
      message:"Error al crear el usuario",
      errorCode:EError.INVALID_PARAMS
    });
  }
  //preguntar por la seguridad al pasar esto a service
  //pasar data a service
  const result = signIn(first_name, last_name, email, age, password);
  //se crea isAdmin para hbs
  let isAdmin = false;
    if (result.role === "admin") {isAdmin = true}
  // token para jwt
  const token = jwt.sign(
    {
      _id: result._id,
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email,
      role: result.role,
      isAdmin: isAdmin,
      last_connection: new Date(),
    },
    options.server.secretToken,
    { expiresIn: "24h" }
  );
  res.cookie(options.server.cookieToken, token, { httpOnly: true });
  res.json({ status: "success", payLoad: result });
};

export const loginCapture = async (req, res) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  req.logger.info(result);
  if (result === false) {
    res.json({ status: "failed", payLoad: "email or pass failed" });
  } else {
    //se crea isAdmin para hbs
    let isAdmin = false;
    if (result.role === "admin") {isAdmin = true}

    // token para jwt
    const token = jwt.sign(
      {
        _id: result._id,
        first_name: result.first_name,
        last_name: result.last_name,
        cart:result.cart,
        email: result.email,
        role: result.role,
        isAdmin: isAdmin,
        last_connection: new Date(),
      },
      options.server.secretToken,
      { expiresIn: "24h" }
    );
    res
      .cookie(options.server.cookieToken, token, { httpOnly: true, sameSite: "none", secure: true })
      .json({ status: "success"})
      // .redirect("http://localhost:3000/profile");
      // .redirect("/profile");
  }
};

export const profileCall = async (req, res) => {
  const userInfo = req.user
  logger.info(userInfo)
  res.json({ status: "success", payLoad: userInfo });
};

export const logoutCapture = async (req, res, next) => {
  const userInfo = req.user
  await updateLastConnection(userInfo._id)
  res
  .clearCookie(`${options.server.cookieToken}`)
  .redirect(303,"/login");
};

export const forgotPassCapture = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await chkUserMail(email);
    if (user===false) {
      return res.send(`<div>Error, <a href="/forgot-password">Intente de nuevo</a></div>`);
    }
    const token = generateEmailToken(email, 15 * 60);
    console.log(token);
    await sendRecoveryPass(email, token);
    res.send("se envio un correo a su cuenta para restablecer la contraseña, regresar <a href='/login'>al login</a>");
  } catch (error) {
    res.send(`<div>Error, <a href="/forgot-password">Intente de nuevo</a></div>`)
  }
}

export const resetPasswordCapture = async (req,res) => {
  try {
    const token = req.query.token;
    const { email, newPassword } = req.body;
    //valodar token
    const validEmailToken = verifyEmailToken(token);
    if (!validEmailToken) {
      return res.send(`El enlace ya no es valido, genere un nuevo enlace para recuperar la contraseña <a href="/forgot-password" >Recuperar contraseña</a>`)
    }
    // verificar email con anterior clave
    const passToChk = await login(email, newPassword);
    if (passToChk) {
      return res.send("No puedes usar la misma contraseña");
    }
    const passToUpdate = await updatePass(email, newPassword);
    logger.warning(passToUpdate);
    res.render("login",{message:"contraseña actualizada"});
  } catch (error) {
    res.send(error.message);
  }
}

export const changeRoleCapture = async (req, res) => {
  const uid = req.params.uid
  try {
    const RoleChange = await updateRole(uid);
    res.json({ status: "success", payLoad: RoleChange });
  } catch (error) {
    res.send(error.message)
  }
  
}

export const documents = async (req, res) => {
  try {
    //revisar user
    const userId = req.params.uid;
    const user = await chkUserId(userId);
    if (user) {
      //revisar documentos
      const identificacion = req.files["identificacion"]?.[0] || null;
      const domicilio = req.files["domicilio"]?.[0] || null;
      const estadoDeCuenta = req.files["estadoDeCuenta"]?.[0] || null;
      const docs = [];
      identificacion ? docs.push({ name: "identificacion", reference: identificacion.filename, status:"completo" }) : docs.push({ name: "identificacion", reference: null, status:"pendiente" });
      domicilio ? docs.push({ name: "domicilio", reference: domicilio.filename, status:"completo" }) : docs.push({ name: "domicilio", reference: null, status:"pendiente" });
      estadoDeCuenta ? docs.push({ name: "estadoDeCuenta", reference: estadoDeCuenta.filename, status:"completo" }) : docs.push({ name: "estadoDeCuenta", reference: null, status:"pendiente" });
      const chkDocs = docs.filter(docu => docu.reference == null);
      //seagrega la info al user
      const dbKey = "documents"
      const docsUpdate = await updateUserDocuService(userId, dbKey, docs);
      console.log(docsUpdate);
      let responseFaltantes = []
      let response = ""
      if (chkDocs.length >= 1) {
        const faltantes = chkDocs.forEach(e => responseFaltantes.push(e.name));
        response = `faltan los documentos ${responseFaltantes}`
      } else {
        response = "todos los documentos cargados"
      }
      res.json({status:"success", message:"documentos agregados", payload:response })
    } else {
      res.json({status:"error", message:"el usuario no existe"})
    }
  } catch (error) {
    res.json({status:"error", message:"error al cargar los documentos"})
  }
}

//test

export const picTest = async (req, res) => {
  try {
    res.json({status: "success"})
  } catch (error) {
    res.send(error.message)
  }
}