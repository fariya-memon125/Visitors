const jwt = require('jsonwebtoken')
const axios = require('axios')



function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"]
    // 401 says not authenticated should redirected to login
    if (!bearerHeader) return res.status(401).send("Access Denied")
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]
    try {
        const verified = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET)
        res.locals.user = verified
    } catch (error) {
        res.status(401)
        return res.send("Access Denied")
    }
    next()
}
function adminAuth(req, res, next) {
    const role = res.locals.user.user.role
    if (role != 0) {
        return (
            // 403  Forbidden
            res.status(403),
            res.send("Access denied")
        )
    }
    next()
}

function captcha(req, res, next) {
    if (req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null) {
        return res.send({ success: false, msg: "Please select captcha" })}
    const secretKey = process.env.SECRET_KEY
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`
    axios.post(verifyUrl).then((response) => {
        const data = response.data.success
        if (!data) return res.send({ success: false, msg: "Failed captcha verification" })}).catch((err) => {
        return res.send({ success: false, msg: err })
    })
    next()
}



module.exports = {
    ensureToken,
    adminAuth,
    captcha
}