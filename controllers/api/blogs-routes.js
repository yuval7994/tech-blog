const router = require("express").Router()
const sequelize = require("../../config/connection")
const { Blogs, Users, Comment } = require("../../models")
const withAuth = require("../../utils/auth")

router.get("/", (req, res) => {
  Blogs.findAll({
    attributes: ["id", "title", "content", "user_id", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "blog_id", "user_id", "created_at"],
        include: {
          model: Users,
          attributes: ["username"],
        },
      },
      {
        model: Users,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogsData) => {
      const blogs = dbBlogsData.map((blogs) => blogs.get({ plain: true }))
      res.json(blogs)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get("/:id", (req, res) => {
  Blogs.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "blogs_id",
          "users_id",
          "created_at",
        ],
        include: {
          model: Users,
          attributes: ["username"],
        },
      },
      {
        model: Users,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogsData) => {
      if (!dbBlogsData) {
        res.status(404).json({ message: "No blogs found with this id" })
        return
      }
      const blog = dbBlogsData.get({ plain: true })
      console.log(blog)
      res.json(blog)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})
router.get("/comments", (req, res) => {
  Blogs.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "blog_id", "user_id", "created_at"],
        include: {
          model: Users,
          attributes: ["username"],
        },
      },
      {
        model: Users,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogsData) => {
      if (!dbBlogsData) {
        res.status(404).json({ message: "No blog found with this id" })
        return
      }
      const blogs = dbBlogsData.get({ plain: true })
      res.json(blogs)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post("/", withAuth, (req, res) => {
  Blogs.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((dbBlogsData) => res.json(dbBlogsData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
