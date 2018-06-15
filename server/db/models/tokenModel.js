'use strict'

const Sequelize = require(`sequelize`)
const database = require(`../database`)

const TokenModel = database.define(`tokenModel`, {
  name : {
    type : Sequelize.STRING,
  },
})

module.exports = TokenModel