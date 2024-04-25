const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const routes = require('./routes/user')
const db = require('./config/dbconnection')
const port = 3000

app.use(bodyparser.json())

app.use('/api/',routes)

app.listen(port, () => {
    console.log(`Node is Running on ${port}`)
})