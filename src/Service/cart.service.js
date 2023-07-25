import CartMongoDao from "../Dao/cart.dao.js";
import DesignMongoDao from "../Dao/designs.dao.js";
import { addLogger, logger } from "../utils/logger.js";
import { getDesignById, updateDesign } from "./designs.service.js";
import { createNewTicket } from "./ticket.service.js";

const designManager = new DesignMongoDao();

const cartManager = new CartMongoDao();

export const createCart = () => {
  const newCart = cartManager.createCart();
  return newCart;
};

export const getAllCarts = (cartId) => {
  const getCart = cartManager.getCart(cartId);
  return getCart;
};

export const deleteCart = (cartId) => {
  const cartToDelete = cartManager.deleteCart(cartId);
  return cartToDelete;
};

export const addDesignToCart = async (cartId, desId, desOwner, quantity) => {
  //confirmar existencia del diseño PENDIENTE
  const designToChk = await designManager.chkDesign(desId);
  const designOwner = designToChk.owner;
  console.log(desOwner);
  if (designOwner == desOwner) {
    console.log("no puedes agregar Tus propios productos");
    return "no puedes agregar Tus propios productos";
  } else {
    const designToAdd = cartManager.addDesignToCart(cartId, desId, quantity);
    return designToAdd;
  }
};

export const deleteDesignFromCart = (cartId, desId) => {
  const designToDelete = cartManager.deleteDesign(cartId, desId);
  return designToDelete;
};

export const clearCart = (cartId) => {
  const cartToClear = cartManager.clearCart(cartId);
  return cartToClear;
};

export const cartPurchase = async (cartId, userId) => {
  //se trae el carrito
  const cartToWork = await cartManager.getCart(cartId);
  //extraigo los id de los diseños en el carrito
  const designCodes = [];
  await cartToWork.designs.forEach((e) => {
    const designsFiltered = {
      designId: e.design._id,
      designQuanty: e.quantity,
    };
    designCodes.push(designsFiltered);
  });
  //reviso el stock de cada diseño
  const chkArray = [];
  const failedDesigns = [];
  for (let i = 0; i < designCodes.length; i++) {
    const designToWork = designCodes[i];
    const singleDesign = await getDesignById(designCodes[i].designId);
    const stockAvailable = singleDesign.stock;
    const newStock = stockAvailable - designToWork.designQuanty;
    if (stockAvailable > designToWork.designQuanty) {
      const definitiveCart = {
        designId: designToWork.designId,
        quanty: designToWork.designQuanty,
      };
      chkArray.push(definitiveCart);
      await updateDesign(e.designId, "stock", newStock);
      logger.info("si alcanza para enviar");
    } else {
      logger.info("no alcanza para enviar");
      const failedToAdd = {
        designId: designToWork.designId,
        quanty: designToWork.designQuanty,
        quantyDiference: newStock,
      };
      failedDesigns.push(failedToAdd);
    }
  }
  logger.info(`resultados del carrito${chkArray}`);
  chkArray.forEach((e) => {
    cartManager.deleteDesign(cartId, e.designId);
  });

  if (chkArray === []) {
    logger.warning("chk esta vacio");
  }
  const packResponse = async () => {
    const payload = {
      correctDesigns: await createNewTicket(cartId, userId, chkArray),
      failedDesigns: failedDesigns,
    };
    return payload;
  };
  return packResponse();
};
