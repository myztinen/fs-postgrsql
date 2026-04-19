const router = require('express').Router()
const { Blog, User, ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')


router.post('/', async (req, res, next) => {

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

router.put('/:id', tokenExtractor, async (req, res, next) => {
    try {
        const readingList = await ReadingList.findByPk(req.params.id)
        const user = await User.findByPk(req.decodedToken.id)
        console.log(readingList)

        if (!readingList) {
            return res.status(404).json({
                error: 'No such reading list'
            })
        }

        if (user.id != readingList.userId) {
            return res.status(403).json({ error: 'This is not your reading list' })
        }
        if (req.body?.read === true) {
            await ReadingList.update(
                { readStatus: true },
                {
                    where: {
                        id: req.params.id,
                    },
                },
            );
            return res.json("successfully changed status")
        }
        return res.status(400).json({ error: 'Something went wrong' })

    } catch (error) {
        next(error)
    }
})



module.exports = router