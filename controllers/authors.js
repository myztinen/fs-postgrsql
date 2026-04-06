const router = require('express').Router()
const { fn, col } = require('sequelize')
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {

    const blogs = await Blog.findAll({
        group: 'author',
        attributes: ['author', [fn('COUNT', col('id')), 'blogs'], [fn('SUM', col('likes')), 'likes']],
        order: [
            ['likes', 'DESC'],
        ],
    })
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)

})

module.exports = router