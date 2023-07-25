import { Router } from "express";
import { addDesignToCartCapture, cartPurchaseCapture, clearCartCapture, createCartCapture, deleteCartCapture, deleteDesignFromCartCapture, getAllCartsCapture, getCartByIdCapture } from "../Controller/cart.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
const cartRouter = Router();

//rutas cart
cartRouter.get("/", getAllCartsCapture);
cartRouter.get("/:cartId", getCartByIdCapture);
cartRouter.post("/", createCartCapture);
cartRouter.put("/:cartId/design/:desId",authenticate("authJWT"), authorize(["user", "premium"]), addDesignToCartCapture);
cartRouter.delete("/clear/:cartId", clearCartCapture);
cartRouter.delete("/:cartId/design/:desId", deleteDesignFromCartCapture);
cartRouter.delete("/:cartId", authenticate("authJWT"), authorize("admin"), deleteCartCapture);
//purchase y ticket
cartRouter.post("/:cartId/purchase", authenticate("authJWT"), authorize("user"), cartPurchaseCapture);

export {cartRouter};