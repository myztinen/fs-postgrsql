const router = require('express').Router()
const { Blog, User } = require('../models')


const { ReadingList } = require('../models')

router.post('/', async (req, res, next) => {
    //req.blog = await Blog.findByPk(req.params.id)

    try {
        console.log(req.body)
        const blogId = await Blog.findByPk(req.body.blogId)
        if (blogId === null) {
            return res.status(400).json({
                error: 'No blog id was found'
            })
        }
        const userId = await User.findByPk(req.body.userId)
        if (userId === null) {
            return res.status(400).json({
                error: 'No user id was found'
            })
        }
        const readingList = await ReadingList.create(req.body)
        res.json(readingList)
    } catch (error) {
        next(error)
    }
})


module.exports = router