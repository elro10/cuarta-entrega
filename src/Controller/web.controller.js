//imports app
import passport from "passport";
import jwt from "jsonwebtoken";
//import propios
import { profileCall } from "./user.controller.js";
import { options } from "../config/config.js";
import { getDesigns } from "../Service/designs.service.js";
import { getUserToken } from "../Service/user.service.js";
import { getAllCarts } from "../Service/cart.service.js";
import { ioSocketLaunch } from "../sockets/ioSockets.sockets.js";


export const renderSignin = async (req, res) => {
  try {
    res.render("signin");
  } catch (error) {
    res.send(`<div>Hubo un error al cargar esta vista</div>`);
  }
};

export const renderIndex = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.send(`<div>Hubo un error al cargar esta vista</div>`);
  }
};

export const renderLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.send(`<div>Hubo un error al cargar esta vista</div>`);
  }
};

export const renderDesigns = async (req, res) => {
  try {
    //saco el carrito del token
    let token = req.cookies[options.server.cookieToken];
    passport.authenticate("jwt", { session: false });
    const userData = jwt.verify(token, options.server.secretToken);
    const userCart = userData.cart[0]._id
    console.log(userData.cart[0]._id);
    //llamo a traer los diseños
    const designs = await getDesigns()
    res.render("designs", {designs,userCart});
  } catch (error) {
    console.log(error);
    res.send(`<div>Hubo un error al cargar esta vista</div>`);
  }
};

export const renderProfile = async (req, res) => {
  try {
    //problemas al extraer desde la funcion de user.controller
    let token = req.cookies[options.server.cookieToken];
  passport.authenticate("jwt", { session: false });
  const userData = jwt.verify(token, options.server.secretToken);
    res.render("profile", {userData});
  } catch (error) {
    console.log(error);
    res.send(`<div>Hubo un error al cargar esta vista</div>`);
  }
};

export const renderCart = async (req,res) =>{
  try {
    //problemas al extraer desde la funcion de user.controller
    //saco el carrito del token
    let token = req.cookies[options.server.cookieToken];
    passport.authenticate("jwt", { session: false });
    const userData = jwt.verify(token, options.server.secretToken);
    const userCart = userData.cart[0]._id
    console.log(userData.cart[0]._id);
    //llamo al carrito
    let getCart = await getAllCarts(userCart);
    let detailCart = getCart.designs
    console.log(detailCart);
    res.render("cart", {detailCart, getCart});
  } catch (error) {
    console.log(error);
    res.send(`<div>Hubo un error al cargar esta vista</div>`);
  }
}

export const renderChat = async (req,res) =>{
  //se abre conexion de socket
  const chat = ioSocketLaunch();
  res.render("chat");
}

export const renderAddDesign = async(req,res) =>{
  res.render("adddesign")
}

export const forgotPassword = async (req, res) => {
  res.render("forgotPass")
}

export const resetPass = async (req, res) => {
  const token = req.query.token;
  res.render("resetPassword", { token });
}