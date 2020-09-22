import user from '../models/user.model'

const express = require('express');
const router = express.Router();
const userService = require('../routes/user.service');
var bcrypt = require('bcrypt');


exports.authenticate = (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

exports.register = (req, res) => {
    const newUser = new user(req.body);

    newUser.save((err, item) => {
        if(err){
            res.send(err);
        }

        res.json(item);
    })
}