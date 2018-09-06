const express = require(`express`)
const volleyball = require(`volleyball`)
const path = require(`path`)

const db = require(`./db`)

const app = express()

// Logging middleware
app.use(volleyball)

// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// Static file serving middleware
app.use(express.static(path.join(__dirname, `../public`)))

// API requests
app.use(`/api`, require(`./api`))

// All other requests
app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `../public`))
})

// Error handling
app.use((error, req, res, next) => {
  console.error(error)
  console.error(error.stack)
  res.status(error.status || 500).send(error.message || `Internal Server Error`)
})

// 404 responses
app.use((req, res, next) => {
  res.status(404).send(`Nothing here. Sorry.`)
})

// Define port
const PORT = process.env.PORT || 1337

// Sync the DB and start up the server
db.sync(/* {force : true} */)
  .then(() => {
    console.log(`\nDatabase Synced\n`)
    app.listen(PORT, () => console.log(`Partying hard on http://localhost:${PORT}\n`))
  })
