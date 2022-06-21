const Blogs = require("./Blogs")
const Comment = require("./Comment")
const Users = require("./Users")

Users.hasMany(Blogs, {
  foreignKey: "user_id",
})

Blogs.belongsTo(Users, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
})

Comment.belongsTo(Users, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
})

Comment.belongsTo(Blogs, {
  foreignKey: "blog_id",
  onDelete: "SET NULL",
})

Users.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
})

Blogs.hasMany(Comment, {
  foreignKey: "blog_id",
})

module.exports = { Blogs, Users, Comment }
