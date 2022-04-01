const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const verfy = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verfy;
        next();
    } catch (err) {
        return res.status(400).send('Invalid token.');
    }
}

module.exports = verifyToken;