import mongoose from 'mongoose';
import product from '../models/productModel';



exports.get = (req, res) => {
    product.findById(req.params.id, (err, item) => {
        if(err){
            res.send(err);
        }
        res.json(item);        
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