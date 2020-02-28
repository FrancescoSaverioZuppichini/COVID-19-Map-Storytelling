const proxy = require("express-http-proxy")
const express = require("express")
const path = require("path")
const logger = require("morgan")

const PORT = process.env.PORT || "8080"

const DATA_URl = "https://github.com/"

app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use("/api/v1/data/", proxy(DATA_URl))

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}`
  )
)