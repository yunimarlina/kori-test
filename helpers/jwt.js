const jwt = require('jsonwebtoken')

function generateToken(object) {
    return jwt.sign(object,'secret')
}

function verifyToken(token){
    return jwt.verify(token,'secret')
}

module.exports = {generateToken,verifyToken}