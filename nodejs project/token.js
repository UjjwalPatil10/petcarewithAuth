const Jwt = require("jsonwebtoken")
// require("dotenv").config()
const createToken = (payload) => {
    try {
        return Jwt.sign(payload, process.env.SECRET_KEY)
    } catch (error) {
        console.log(error)
    }
}

const verifyToken = (token) => {
    try {
        return Jwt.verify(token)
    } catch (error) {
        console.log(error)
    }
}
module.exports = { createToken, verifyToken }
