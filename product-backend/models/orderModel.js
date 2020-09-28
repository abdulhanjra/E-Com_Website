import { stringify } from 'querystring';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      qty: { type: Number, default: 0 },
    },
  ],
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);

