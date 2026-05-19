let jwt = require('jsonwebtoken');
let User = require('../models/user.model');

let authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: error.message
        });
    }
}

module.exports = authMiddleware;
