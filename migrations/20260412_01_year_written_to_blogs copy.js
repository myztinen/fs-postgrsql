const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
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
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}