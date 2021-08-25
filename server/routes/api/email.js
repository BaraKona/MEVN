const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

const url = 'mongodb://localhost:5600/test'


//Get
router.get('/get', function(req,res,next){
        const resultArray= [];          //creats empty array for data rep
        mongodb.connect(url,function(err, db){
        assert.equal(null, err);
        const cursor = db.collection('user-email').find();  //.find will give all entries and stored inside variable
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            resultArray.push(doc);  // pushes all elements on array into doc

        }, function(){
            db.close();
            res.render('index', {items:resultArray});
        }); 
    })
})

//post function for user to insert
router.post('/', function(req, res, next){
    var item = {
        //request item of name email
        email: req.body.email
    };

    mongodb.connect(url, function(err, db){
        //check if we have error or not
        assert.equal(null, err);
        //specify the name of the collection from which you want to inser data
        //specify insert one item
        db.collection('user-email').insertOne(item, function(err, result){
        assert.equal(null,error);
        console.log('Item inserted'); //log on console so we know
        db.close(); //close database
        })
    })
    res.redirect('/');
})
module.exports = router;