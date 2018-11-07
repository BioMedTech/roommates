const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User');
const mongoose = require('mongoose');
const errHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            const token = candidate.generateAuthToken();
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Incorrect password or email.'
            })
        }
    } else

        res.status(404).json({
            message: 'Incorrect password or email.'
        })
};


module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        res.status(409).json({
            message: 'User with this email had already registered. Try another one.'
        })
    } else {
        const salt = await bcrypt.genSalt(10);
        const password = req.body.password;
        const hashedpass = await bcrypt.hash(password, salt);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            birthday: req.body.birthday,
            password: hashedpass,
            phone: req.body.phone
        });
        try {
            await user.save();
            const token = user.generateAuthToken();
            res.status(200).json(
                {token: `Bearer ${token}`}
            )
        } catch (e) {
            errHandler(res, e)
        }

    }
};
