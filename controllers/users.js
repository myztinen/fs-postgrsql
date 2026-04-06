const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['userId'] },
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

module.exports = router