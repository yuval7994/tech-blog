const { Comment } = require("../models")

const commentData = [
  {
    comment_text: "test I",
    user_id: 1,
    blog_id: 1,
  },
  {
    comment_text: "test II",
    user_id: 2,
    blog_id: 2,
  },
]

const seedComment = () => Comment.bulkCreate(commentData)
module.exports = seedComment
