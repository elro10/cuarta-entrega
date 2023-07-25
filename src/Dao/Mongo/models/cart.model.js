import mongoose from "mongoose";

const cartCollection = "carts";

const cartsSchema = new mongoose.Schema({
  designs: {
    type: [
      {
        design: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "designs",
        },
        quantity: Number,
      },
    ],
    default: [],
  },
});

cartsSchema.pre("findOne", function () {
  this.populate("designs.design");
});

const cartModel = mongoose.model("carts", cartsSchema);
export default cartModel;
