const express = require('express')
const app = express()
const router = express.Router()

const User = require('../models/user.models')

app.use(express.json())

router.post('/', async (req, res) => {
    const user = new User({
        code: req.body.code,
        firstName: req.body.firstName,
        surname: req.body.surname,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email

    })

    try {
        const response = await user.save()
        res.json(response)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.get('/', async (req, res) => {
    try {
        const items = await User.find()
        res.json(items)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.get('/getUser', async (req, res) => {
    User.findById(req.body.id).then(doc => {
        if (!doc) {
            return res.status(404).end()
        }
        return res.status(200).json(doc)
    }).catch(err => next(err))

})

router.put('/', async (req, res) => {
    var conditions = {_id: req.body._id};
    console.log(conditions)
    User.update(conditions, req.body).then(doc => {
        if (!doc) {
            return res.status(404).end()
        }
        return res.status(200).json(doc)
    }).catch(err => next(err))
})

router.delete('/delete', (req, res) => {
    res.send(req.body.id)
    User.findByIdAndRemove(req.body.id).exec().then(doc => {
        if (!doc) {
            return res.status(404).end()
        }
        return res.status(204).end()
    }).catch(err => next(err))

})

module.exports = router