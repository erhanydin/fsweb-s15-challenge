const userModel = require('../models/user-model');
const bcrypt = require('bcryptjs');

const payloadCheck = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if(!username || !password) {
            res.status(400).json({message: 'username ve şifre gereklidir'});
        } else {
            req.encPassword = await bcrypt.hash(password, 8);
            next();
        }

    } catch (error) {
        next(error);
    }
}

const usernameCheck = async (req, res, next) => {
    try {
        const {username} = req.body;
        let isExistUserBy = await userModel.getByFilter({username: username});
        if(isExistUserBy) {
            res.status(401).json({message: 'username alınmış'});
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

const passwordCheck = async (req, res, next) => {
    try {
        let user = await userModel.getByFilter({username: req.body.username});
        if(!user) {
            res.status(401).json({message: 'geçersiz kriterler'});
        } else {
            let isTruePassword = bcrypt.compareSync(req.body.password, user.password);
            if(!isTruePassword) {
                res.status(401).json({message: 'geçersiz kriterler'});
            } else {
                req.user = user;
                next();
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    payloadCheck,
    usernameCheck,
    passwordCheck
}