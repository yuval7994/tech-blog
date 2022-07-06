const express = require("express")
const path = require("path")
const session = require("express-session")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")

const app = express()
const PORT = process.env.PORT || 3001

const sequelize = require("./config/connection")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const sess = {
  secret: "a big secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}

app.use(session(sess))


const helpers = require("./utils/helpers")

const hbs = exphbs.create({
  extname: "handlebars",
  defaultLayout: "main",
  layoutsDir: __dirname + "/views/layout",
  helpers,
})

app.engine("handlebars", hbs.engine)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get("/", (req, res) => {
  res.render("homepage")
})

app.use(require("./controllers/"))

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening..."))
})
