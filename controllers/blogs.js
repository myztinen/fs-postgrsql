const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { Blog, User } = require('../models')

const { SECRET } = require('../util/config')


const blogFinder = async (req, res, next) => {
    try {
        req.blog = await Blog.findByPk(req.params.id)
        if (!req.blog) {
            return res.status(404).end()
        }
        next()
    } catch (error) {
        next(error)
    }

}

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

const userExtractor = (req, response, next) => {
    if (req.decodedToken && req.decodedToken.id) {
        req.user = req.decodedToken.id
    } else {
        req.user = null
    }
    next()
}


router.get('/', async (req, res) => {
    let where = {}
    if (req.query.search) {
        where = {
            [Op.or]: [{
                title: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            {
                author: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            }]
        }

    }

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name', 'username']
        },
        order: [
            ['likes', 'DESC'],
        ],
        where
    })
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)

})

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({ ...req.body, userId: user.id }, { returning: true })
        return res.json({ ...blog.dataValues, user: user })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', tokenExtractor, userExtractor, blogFinder, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'No token' })
        }
        if (req.blog.userId !== req.user) {
            return res.status(403).json({ error: 'Wrong user' })
        }
        await req.blog.destroy()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

router.put('/:id', blogFinder, async (req, res, next) => {
    try {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } catch (error) {
        next(error)
    }
})


module.exports = router