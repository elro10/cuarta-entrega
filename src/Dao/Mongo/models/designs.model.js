import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const designsSchema = new mongoose.Schema({
  code: {
    type: Number,
  },
  title: String,
  description: String,
  category: String,
  price:Number,
  status:{
    type:Boolean,
    default:"true",
  },
  stock:Number,
  favorites:Number,
  shops: {
    type: Array,
    default: [],
  },
  photos: {
    type: Array,
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default:"admin"
  }
});

designsSchema.plugin(mongoosePaginate);

const designModel = mongoose.model("designs", designsSchema);
export default designModel;