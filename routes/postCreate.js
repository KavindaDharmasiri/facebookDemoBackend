const express = require('express')
const app = express()
const router = express.Router()

const Post = require('../models/postCreat.models')

app.use(express.json())

//Save
router.post('/', async (req, res) => {
    const post = new Post({
        code: req.body.code,
        userId: req.body.userId,
        date: req.body.date,
        time: req.body.time,
        title: req.body.title,
        body: req.body.body,

    })

    try {
        const response = await post.save()
        res.json(response)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

//Get All
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

//Get By Id
router.get('/:id', async (req, res) => {
    Post.findById(req.params.id).then(doc => {
        if (!doc){return res.status(404).end()}
        return res.status(200).json(doc)
    }).catch(err => next(err))

})

//Update
router.put('/', async (req, res) => {
    var conditions = {_id: req.body._id };
    console.log(conditions)
    Post.update(conditions,req.body).then(doc => {
        if (!doc){return res.status(404).end()}
        return res.status(200).json(doc)
    }).catch(err => next(err))
})

//Delete
router.delete('/:id', (req, res) => {
    res.send(req.params.id)
    Post.findByIdAndRemove(req.params.id).exec().then( doc =>{
        if (!doc){
            return res.status(404).end()
        }
        return res.status(204).end()
    }).catch(err => next(err))

})

module.exports = router