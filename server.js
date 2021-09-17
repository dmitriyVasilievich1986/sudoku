const express = require('express')
const app = express()
const port = 3000

app.use('/static', express.static('static'));

app.all("*", (req, res) => {
    res.sendFile(__dirname + "/template/index.html");
})

app.listen(port, "0.0.0.0", () => {
    console.log(`start server`)
})