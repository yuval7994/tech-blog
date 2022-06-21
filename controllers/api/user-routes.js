const router = require("express").Router()
const { Blogs, Users, Comment } = require("../../models")

router.get("/", (req, res) => {
  Users.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUsersData) => res.json(dbUsersData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get("/:id", (req, res) => {
  Users.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Blogs,
        attributes: ["id", "title", "content", "user_id", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "blogs_id", "user_id"],
        include: {
          model: Blogs,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUsersData) => {
      if (!dbUsersData) {
        res.status(404).json({ message: "No user found with this id" })
        return
      }
      res.json(dbUsersData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post("/", (req, res) => {
  Users.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUsersData) => {
      req.session.save(() => {
        req.session.user_id = dbUsersData.id
        req.session.username = dbUsersData.username
        req.session.loggedIn = true

        res.json(dbUsersData)
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post("/login", (req, res) => {
  Users.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUsersData) => {
      if (!dbUsersData) {
        res.status(400).json({ message: "No user with that username!" })
        return
      }

      const validPassword = dbUsersData.checkPassword(req.body.password)

      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" })
        return
      }

      req.session.save(() => {
        req.session.user_id = dbUsersData.id
        req.session.username = dbUsersData.username
        req.session.loggedIn = true

        res.json({ user: dbUsersData, message: "You are now logged in!" })
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

router.put("/:id", (req, res) => {
  Users.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUsersData) => {
      if (!dbUsersData) {
        res.status(404).json({ message: "No user found with this id" })
        return
      }
      res.json(dbUsersData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.delete("/:id", (req, res) => {
  Users.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUsersData) => {
      if (!dbUsersData) {
        res.status(404).json({ message: "No user found with this id" })
        return
      }
      res.json(dbUsersData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
