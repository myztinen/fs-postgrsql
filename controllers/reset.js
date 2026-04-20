const router = require('express').Router()

const { User, Blog, ReadingList, Session } = require('../models')

router.post('/', async (req, res) => {
    await User.destroy({ truncate: true, cascade: true })
    await Blog.destroy({ truncate: true, cascade: true })
    await ReadingList.destroy({ truncate: true, cascade: true })
    await Session.destroy({ truncate: true, cascade: true })
    res.status(200).send()
})


module.exports = router