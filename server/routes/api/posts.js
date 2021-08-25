const express = require('express');
const mongodb = require('mongodb');


const router = express.Router();

//GET Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//ADD something
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        //createdAt: new Date()
    });
    res.status(201).send();
});

//Delete 
router.delete('/:id', async (req, res ) =>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({ "_id" : mongodb.ObjectId(req.params.id)})
    res.status(200).send();
})
//Delete 


async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://bara123:bara1234@cluster0.lzsay.mongodb.net/vue_express?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}



module.exports = router;