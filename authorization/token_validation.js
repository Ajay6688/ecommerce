const jwt = require("jsonwebtoken");
const config = require('config')

function checktoken(req, res, next) {
    const header = req.get('authorization');
    if (header != undefined) {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, config.get("jwt.secretKey"), (error, decoded) => {
            if (error) {
                return res.status(400).send({
                    "status": 400,
                    "error": "Invalid Token"
                });
            } else {
                next();
            }
        });

    } else {
        return res.status(400).send({
            "status": 400,
            "error": "unauthorized user"
        })
    }
}

module.exports = {
    checktoken
}