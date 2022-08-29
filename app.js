const express = require('express')
const mongoose = require('mongoose')

const user = require('./routes/user')
const post = require('./routes/postCreate')
const log = require('./routes/userLogin')

const app = express()
const port = 4000

const url = 'mongodb://127.0.0.1/express'

mongoose.connect(url, {useNewUrlParser: true})
const con = mongoose.connection

con.on("open", () => {
    console.log('MongoDB connected!');
})

app.use(express.json())

app.use('/users', user)
app.use('/posts', post)
app.use('/logging', log)

app.listen(port, () => {
    console.log(`app starting on ${port}`);
})