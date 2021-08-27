const express = require('express');
const mongodb = require('mongodb');


const router = express.Router();
var url = 'http://localhost:5000/api/crypto';

//GET crypto
router.get('/', async (req, res) => {
    const crypto = await loadPostsCollection();
    res.send(await crypto.find({}).toArray());
});

//ADD something
router.post('/', async (req, res) => { 
    const crypto = await loadPostsCollection();
    await crypto.insertOne({
        text: req.body.text,
        //createdAt: new Date()
    });
    res.status(201).send();
});
//Delete 
router.delete('/:id', async (req, res ) =>{
    const crypto = await loadPostsCollection();
    await crypto.deleteOne({ "_id" : mongodb.ObjectId(req.params.id)})
    res.status(200).send();
})
 


async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://bara123:bara1234@cluster0.lzsay.mongodb.net/crypto?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('crypto').collection('crypto');
}



module.exports = router;