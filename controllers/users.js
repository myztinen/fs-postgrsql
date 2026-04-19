const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['userId', 'password'] },
        include: {
            model: Blog,
            attributes: ['id', 'title', 'author', 'url', 'likes']
        }
    })
    res.json(users)
})

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        next(error)
    }
})

router.put('/:username', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username
            }
        })
        user.name = req.body.name
        const savedUser = await user.save()
        res.json(savedUser)
        if (user) {
            res.json(user)
        } else {
            res.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['name', 'username'],
            exclude: ['id', 'password'],
            include: [{
                model: Blog,
                as: 'readings',
                attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
                through: {
                    attributes: ['id', 'readStatus'],

                },
            }],
        })
        if (user === null) {
            return res.status(400).json({
                error: 'No user id was found'
            })
        }
        const returnableJson = user.toJSON()
        returnableJson.readings = returnableJson.readings.map((blog) => {
            const join = blog.reading_list
            const readinglists = join ? [{ id: join.id, read: join.readStatus }] : []
            delete blog.reading_list
            return { ...blog, readinglists }
        })
        res.json(returnableJson)
    } catch (err) {
        next(err)
    }
})


module.exports = router