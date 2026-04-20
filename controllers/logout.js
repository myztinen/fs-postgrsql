const router = require('express').Router()

const Session = require('../models/session')
const { tokenExtractor, sessionValidator } = require('../util/middleware')

router.delete('/', tokenExtractor, sessionValidator, async (request, response, next) => {
    try {
        await Session.destroy({ where: { userId: request.user.id } })
        response
            .status(204)
            .send('Succesfully logged out')
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = router