const router = require('express').Router()

const { User, Blog } = require('../models')

router.post('/', async (req, res) => {
    await User.destroy({ truncate: true, cascade: true })
    await Blog.destroy({ truncate: true, cascade: true })
    res.status(200).send()
})


module.exports = router