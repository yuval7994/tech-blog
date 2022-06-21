const { Blogs } = require("../models")

const blogsData = [
  {
    title: "test I",
    content: "testing",
    user_id: 1,
  },
  {
    title: "test II",
    content: "testing",
    user_id: 2,
  },
]
const seedBlogs = () => Blogs.bulkCreate(blogsData);

module.exports = seedBlogs; 