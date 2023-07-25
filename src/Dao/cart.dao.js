import { logger } from "../utils/logger.js";
import cartModel from "./Mongo/models/cart.model.js";

class CartMongoDao {
  constructor() {}

  //crear carrito
  async createCart() {
    try {
      const newCartData = {
        designs: [],
      };
      const newCart = await cartModel.create(newCartData);
      logger.info(`new cart Id${newCart}`);
      return newCart;
    } catch (error) {
      return error;
    }
  }

  //borrar carrito
  async deleteCart(cartId) {
    try {
      const chkCart = await this.getCart(cartId);
      logger.info(`carrito borrado${chkCart}`);
      if (chkCart) {
        const cartToDelete = await cartModel.findByIdAndDelete(cartId);
        logger.warning("carrito eliminado");
        return cartToDelete;
      } else {
        return "cart not found";
      }
    } catch (error) {
      return error;
    }
  }

  //get carrito by Id y todos los carritos
  async getCart(cartId) {
    try {
      if (cartId) {
        const oneCart = await cartModel
          .findById({ _id: `${cartId}` })
          .populate("designs.design")
          .lean();
        return oneCart;
      } else {
        const allCarts = await cartModel.find();
        return allCarts;
      }
    } catch (error) {
      return error;
    }
  }

  //update cart block (add design, delete design)
  async addDesignToCart(cartId, designId, quantity) {
    try {
      const findDesign = await cartModel
        .findById(cartId)
        .populate("designs.design");
      const chkDesignExist = await findDesign.designs.findIndex(
        (des) => des.design._id.toString() === designId
      );
      let quantityToAdd = quantity ? quantity : 1;
      if (chkDesignExist !== -1) {
        findDesign.designs[chkDesignExist].quantity += Number(quantityToAdd);
      } else {
        findDesign.designs.push({ design: designId, quantity: quantityToAdd });
      }
      return findDesign.save();
    } catch (error) {
      // return error;
      throw new Error(error);
    }
  }

  //clear cart
  async clearCart(cartId) {
    try {
      logger.warning(`carrito a borrar${cartId}`);
      let cartToClear = await cartModel.updateOne(
        { _id: `${cartId}` },
        { $pull: { designs: {} } }
      );
      return cartToClear;
    } catch (error) {
      // return error;
      throw new Error(error);
    }
  }

  //eliminar producto del carrito
  async deleteDesign(cartId, designId) {
    try {
      let prodToDelete = await cartModel.updateOne(
        { _id: cartId },
        { $pull: { designs: { design: designId } } }
      );
      return prodToDelete;
    } catch (error) {
      throw new Error(error);
    }
  }

  //actualizar info del carrito pendiente a futuro
  async updateCart(cartId, designId, newQuantity) {
    let designToUpdate = await cartModel.updateOne({ _id: cartId }, []);
    return designToUpdate;
  }
}

export default CartMongoDao;
