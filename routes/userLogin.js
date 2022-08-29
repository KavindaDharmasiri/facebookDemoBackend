const express = require('express')
const app = express()
const router = express.Router()

const User = require('../models/user.models')

app.use(express.json())

router.get('/', async (req, res) => {
    try {
        const posts = await User.find()
        for (var i = 0; i < posts.length; i++) {

            User.findById(posts[i]._id).then(doc => {
                if (!doc) {
                    return res.status(404).end()
                }

                if (req.body.email === doc.email) {
                    if (req.body.password === doc.password) {
                        console.log('logging Success\n' + doc)
                        res.status(204).end()
                    }
                }

            })

        }
    } catch (err) {
        res.send('Err: ' + err)
    }
})

module.exports = router