const router = require("express").Router()
const sequelize = require("../../config/connection")
const { Blogs, Users, Comment } = require("../../models")
const withAuth = require("../../utils/auth")

router.get("/", (req, res) => {
  console.log("======================")
  Blogs.findAll({
    attributes: [
      "id",
      "title",
      "content",
      "user_id",
      "created",
      "comment_text"
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id"],
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
    .then((dbPostData) => res.json(dbPostData))
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
    attributes: [
      "id",
      "title",
      "context",
      "user_id",
      "created",
      "comment_text",
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id"],
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
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" })
        return
      }
      res.json(dbPostData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})


router.put("/:id", withAuth, (req, res) => {
  Blogs.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" })
        return
      }
      res.json(dbPostData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id)
  Blogs.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" })
        return
      }
      res.json(dbPostData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
