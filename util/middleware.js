const jwt = require('jsonwebtoken')
const { User, Session } = require('../models')
const { SECRET } = require('../util/config')


const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch {
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

const sessionValidator = async (req, res, next) => {
    try {
        if (req.decodedToken && req.decodedToken.id) {
            console.log(req.decodedToken)
            req.user = await User.findOne({ where: { id: req.decodedToken.id } })
            req.userSession = await Session.findOne({ where: { userId: req.decodedToken.id } })
            console.log(req.userSession)
            console.log(req.user)
            if (req.user.disabled) {
                return res.status(401).json({ error: 'User is disabled' })
            }
            if (!req.userSession) {
                return res.status(401).json({ error: 'User has no session' })
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = { tokenExtractor, sessionValidator }