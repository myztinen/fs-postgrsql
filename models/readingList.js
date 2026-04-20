const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingList extends Model {
    toJSON() {
        const values = this.get({ plain: true })

        return {
            id: values.id,
            user_id: values.userId,
            blog_id: values.blogId,
            read: values.readStatus,
        }
    }
}

ReadingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
    },
    readStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_list',
    indexes: [
        {
            unique: true,
            fields: ['userId', 'blogId'],
        },
    ]
})

module.exports = ReadingList