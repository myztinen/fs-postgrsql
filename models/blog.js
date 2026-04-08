
const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')


class Blog extends Model { }
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        validate: {
            min: { args: 1991, msg: 'Year must be at least 1991' },
            max(value) {
                const currentYear = new Date().getFullYear()
                if (value > currentYear) {
                    throw new Error(`Year too large`)
                }
            }
        }
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})

module.exports = Blog
