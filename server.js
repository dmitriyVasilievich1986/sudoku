const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express')
require('dotenv').config()
const app = express()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const host = process.env.HOST || "localhost"
const port = process.env.PORT || 3000

app.use('/static', express.static('static'));

app.post('/api/account/login/', urlencodedParser, (req, res) => {
    res.send('{"token":"token"}')
})

app.post('/api/account/', urlencodedParser, (req, res) => {
    res.send('{"token":"token"}')
})

app.get('/api/account/', urlencodedParser, (req, res) => {
    res.send('{"username":"root"}')
})

app.patch('/api/account/', urlencodedParser, (req, res) => {
    res.send('{"username":"root"}')
})

app.post('/api/account/logout/', urlencodedParser, (req, res) => {
    res.send('ok')
})

app.all("*", (req, res) => {
    res.sendFile(__dirname + "/template/index.html");
})

app.listen(port, host, () => {
    console.log(`start server: ${host}:${port}`)
})