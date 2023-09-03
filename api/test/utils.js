const jsonwebtoken = require("jsonwebtoken")

const getTokenForAdmin = () => {
    const signedToken = jsonwebtoken.sign({ userName: `userDummy@gmail.com`, id: 9999999, role: "admin" }, "PASSWORD123456789", { expiresIn: '60m' })
    return signedToken
}

const getTokenForNonAdmin = () => {
    const signedToken = jsonwebtoken.sign({ userName: `userDummy@gmail.com`, id: 9999999, role: "user" }, "PASSWORD123456789", { expiresIn: '60m' })
    return signedToken
}


module.exports = { getTokenForAdmin, getTokenForNonAdmin }