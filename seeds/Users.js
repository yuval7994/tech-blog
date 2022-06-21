const { Users } = require("../models")

const usersData = [
  {
    username: "Yuval",
    password: "yuval",
  },
  {
    username: "Dylan",
    password: "dylan",
  },
]
const seedUsers = () => Users.bulkCreate(usersData)

module.exports = seedUsers
