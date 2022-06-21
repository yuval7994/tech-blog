const sequelize = require("../config/connection")
const { Blogs, Users, Comment } = require("../models")
const router = require("express").Router()
const withAuth = require("../utils/auth")

router.get("/", (req, res) => {
  Blogs.findAll({
    attributes: ["id", "title", "content", "user_id", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "blog_id", "user_id"],
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
      console.log(req.session)
      res.render("homepage", { blogs, loggedIn: req.session.loggedIn })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/")
    return
  }
  res.render("login")
})

router.get("/signup", (req, res) => {
  res.render("signup")
})

router.get("/blogs/:id", (req, res) => {
  Blogs.findOne({
    where: {
      id: req.params.id,
    },
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
      if (!dbBlogsData) {
        res.status(404).json({ message: "No blog found with this id" })
        return
      }
      const blog = dbBlogsData.get({ plain: true })
      console.log(blog)
      res.render("single-blog", { blog, loggedIn: req.session.loggedIn })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})
router.get("/blogs-comments", (req, res) => {
  Blogs.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "user_id", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "blog_id", "user_id"],
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

      res.render("blogs-comments", { blogs, loggedIn: req.session.loggedIn })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get("/dashboard", withAuth, (req, res) => {
  Blogs.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "content", "user_id", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "blog_id", "user_id"],
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
      console.log(req.session)
      res.render("dashboard", { blogs, loggedIn: req.session.loggedIn })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})
module.exports = router
