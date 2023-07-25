//importapp
import jwt from "jsonwebtoken";
import passport from "passport";
import cookieParser from "cookie-parser";
//import propio
import {
  getAllCarts,
  deleteCart,
  createCart,
  addDesignToCart,
  clearCart,
  deleteDesignFromCart,
  cartPurchase,
} from "../Service/cart.service.js";
import { options } from "../config/config.js";
import { profileCall } from "./user.controller.js";
import { CustomError } from "../Service/Error/customError.service.js";
import { generateCartErrorInfo } from "../Service/Error/cartErrorInfo.js";
import { EError } from "../enums/EError.js";
import { logger } from "../utils/logger.js";

export const createCartCapture = async (req, res) => {
  const result = await createCart();
  res.json({ status: "success", payLoad: result });
};

export const getAllCartsCapture = async (req, res) => {
  const result = await getAllCarts();
  res.json({ status: "success", payLoad: result });
};

export const getCartByIdCapture = async (req, res) => {
  const cartId = req.params.cartId;
  logger.info(cartId);
  const result = await getAllCarts(cartId);
  res.json({ status: "success", payLoad: result });
};

export const deleteCartCapture = async (req, res) => {
  const cartId = req.params.cartId;
  const result = await deleteCart(cartId);
  res.json({ status: "success", payLoad: result });
};

export const addDesignToCartCapture = async (req, res) => {
  const cartId = req.params.cartId;
  const desId = req.params.desId;
  const quantity = req.body.quantity;
  const user = req.user;
  const desOwner = user._id
  
  const result = await addDesignToCart(cartId, desId, desOwner, quantity);
  res.json({ status: "success", payLoad: result });
};

export const deleteDesignFromCartCapture = async (req, res) => {
  const cartId = req.params.cartId;
  const desId = req.params.desId;
  const result = await deleteDesignFromCart(cartId, desId);
  res.json({ status: "success", payLoad: result });
};

export const clearCartCapture = async (req, res) => {
  const cartToClear = req.params.cartId;
  const result = await clearCart(cartToClear);
  res.json({ status: "success", payLoad: result });
};

export const cartPurchaseCapture = async (req, res) => {
  try {
    const cartToPurchase = req.params.cartId;
    //se deja busqueda directa de la data del user
    let token = req.cookies[options.server.cookieToken];
    passport.authenticate("jwt", { session: false });
    const userData = jwt.verify(token, options.server.secretToken);
    //se arma paquete para la funcion
    const userEmail = userData.email;
    const result = await cartPurchase(cartToPurchase, userEmail);
    console.log(result);
    res.json({ status: "success", payLoad: result });  
  } catch (error) {
    res.status(404).send({ error: `error desde controller${error}` });
  }
  
};
