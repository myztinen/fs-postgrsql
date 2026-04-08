const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readingList')


User.hasMany(Blog)
Blog.belongsTo(User)
Blog.belongsToMany(User, { through: Readinglist })
User.belongsToMany(Blog, { through: Readinglist })

//User.sync({ alter: true })
//Blog.sync({ alter: true })

module.exports = {
    Blog,
    User,
    Readinglist
}