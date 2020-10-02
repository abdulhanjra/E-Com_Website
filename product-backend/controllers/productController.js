import mongoose from 'mongoose';
import product from '../models/productModel';
import order from '../models/orderModel'
const userService = require("../models/userService");


exports.get = (req, res) => {
    product.findById(req.params.id, (err, item) => {
        if(err){
            res.send(err);
        }
        res.json({status:200,item});
    });
};

exports.getAll = (req, res) => {
    product.find({}, (err, item) => {
        if (err) {
            res.send(err);
        }

        res.json(item);
    });
};

exports.post = (req, res) => {
    const newProduct = new product(req.body);

    newProduct.save((err, item) => {
        if (err) {
            res.send(err);
        }

        res.json(item);
    });
};

exports.update = (req, res) => {
    product.findOneAndUpdate({
        _id: req.params.id
    }, req.body,
        (err, item) => {
            if (err) {
                res.send(err);
            }

            res.json({status:200,item});
        });
};

exports.delete = (req, res) => {
    console.log("======>",'here',req.params.id)
    product.remove({
        _id: req.params.id
    }, (err) => {
        if (err) {
            res.send(err);
        }

        res.json({
            message: `product ${req.params.productId} successfully deleted`
        });
    });
};

exports.createOrder = (req, res) => {

    let newOrder = new order(req.body);
    newOrder.userId = req.user.sub;
    console.log("req.user.sub", req.user.sub);
    newOrder.save((err, item) => {
        if (err) {
            res.send(err);
        }

        res.json(item);
    })
}

exports.getOrders = (req, res) => {
    order.find({ userId: req.user.sub }).populate("userId").populate({ path: 'products', model: 'Product' }) .exec((error, item) => {
        if (error) {
            res.send(error);
        }
        console.log("=====>",item);

        res.json(item);
      });
}

exports.getByID = (req, res) => {
    order.findById(req.params.id, (err, item) => {
        if(err){
            res.send(err);
        }
        res.json(item);
    });
}
