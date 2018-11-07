const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User');
const mongoose = require('mongoose');
const errHandler = require('../utils/errorHandler');
module.exports.update = async function (req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.user._id,
            {
                name: req.body.name,
                email: req.body.email,
                birthday: req.body.birthday,
                phone: req.body.phone
            }, {new: true})

        if (!user) {
            res.status(404).json({
                message: 'Not found'
            })
        } else {
            res.status(200).json(user)
        }
    } catch (e) {
        errHandler(res, e)
    }

}
module.exports.delete = async function (req, res) {
    try {
        const user = await User.findByIdAndRemove(req.user._id);

        if (!user) {
            res.status(404).json({
                message: 'Not found.'
            })
        }
        else {
            res.status(200).json(user)
        }
    }
    catch (e) {
        errHandler(res, e)
    }
};
module.exports.get = async function (req, res) {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            res.status(404).json({
                message: 'Not found.'
            })
        }
        else {
            res.status(200).json(user)
        }
    }
    catch (e) {
        errHandler(res, e)
    }
};
module.exports.changePass = async function (req, res) {
    try {
        const user = await User.findOne({id: req.user._id});

        if (user) {
            const passwordResult = bcrypt.compareSync(req.body.password, user.password);
            if (passwordResult) {
                const user = await User.findByIdAndUpdate(req.user._id,
                    {
                        password: req.body.new_password
                    }, {new: true})
            } else {
                res.status(401).json({
                    message: 'Неверный пароль'
                })
            }
        } else
            res.status(404).json({
                message: 'Пользователь не найден'
            })
    } catch (e) {
        errHandler(res, e)
    }
};
module.exports.list = async () => {
    try {
        const users=await User.find();
        res.status(200).json(users);
    } catch (e) {
        errHandler(res, e)
    }
};