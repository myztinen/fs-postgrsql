const router = require('express').Router()
const { Blog, User, ReadingList } = require('../models')
const { tokenExtractor, sessionValidator } = require('../util/middleware')


router.post('/', async (req, res, next) => {

    try {
        if (!req.body.blogId || !req.body.userId) {
            return res.status(400).json({
                error: 'Missing parameter'
            })
        }
        const blogId = await Blog.findByPk(req.body.blogId)
        if (blogId === null) {
            return res.status(404).json({
                error: 'No blog id was found'
            })
        }
        const userId = await User.findByPk(req.body.userId)
        if (userId === null) {
            return res.status(404).json({
                error: 'No user id was found'
            })
        }
        const readingList = await ReadingList.create(req.body)
        res.json(readingList.toJSON())
        next()
    } catch (error) {
        next(error)
    }
})

router.put('/:id', tokenExtractor, sessionValidator, async (req, res, next) => {
    try {
        const readingList = await ReadingList.findByPk(req.params.id)
        const user = await User.findByPk(req.decodedToken.id)

        if (!readingList) {
            return res.status(404).json({
                error: 'No such reading list'
            })
        }

        if (user.id != readingList.userId) {
            return res.status(401).json({ error: 'This is not your reading list' })
        }
        if (req.body?.read !== null) {
            const update = await ReadingList.update(
                { readStatus: req.body?.read },
                {
                    where: {
                        id: req.params.id,
                    },
                    returning: true
                },
            );
            return res.json(update[1][0])
        }
        return res.status(400).json({ error: 'Something went wrong' })

    } catch (error) {
        next(error)
    }
})



module.exports = router