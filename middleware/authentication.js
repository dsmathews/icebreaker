const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("token", token);
        const decoded = jwt.verify(token, process.env.SK);
        console.log("authentication middleware", decoded)
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication Failed'
        });
    }
};