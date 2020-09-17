const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    tags: [{type: String}],
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

export default mongoose.model("Product", productSchema);

