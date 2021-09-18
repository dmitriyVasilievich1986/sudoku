const express = require('express')
require('dotenv').config()
const app = express()

const host = process.env.HOST || "localhost"
const port = process.env.PORT || 3000

app.use('/static', express.static('static'));

app.all("*", (req, res) => {
    res.sendFile(__dirname + "/template/index.html");
})

app.listen(port, host, () => {
    console.log(`start server: ${host}:${port}`)
})