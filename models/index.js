const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')


User.hasMany(Blog)
Blog.belongsTo(User)
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'readers' })
ReadingList.belongsTo(Blog)
ReadingList.belongsTo(User)


module.exports = {
    Blog,
    User,
    ReadingList
}