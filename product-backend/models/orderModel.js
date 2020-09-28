import { stringify } from 'querystring';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id: {type: String},
    userId: {type: String},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

export default mongoose.model("Order", orderSchema);

