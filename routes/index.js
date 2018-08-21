var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
var Company = require('../models/companies');
var jwt = require('jsonwebtoken');
var assert = require('assert');
//var url = 'mongodb://mongodb3578ms:ze6hoq@danu7.it.nuigalway.ie:8717/mongodb3578';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/resultsPage', function(req, res, next) {
    res.render('resultsPage');
});
router.get('/frontend', function(req, res, next) {
    res.render('frontend');
});
router.post('/addComment', function(req, res, next) {
   console.log(req.body);
    // Extract the request body which contains the comments
    comment = new Comment(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/getComments', function(req, res, next) {

    Comment.find({}, function (err, comments) {
        if (err)
            res.send(err);
        res.json(comments);
    });
});
router.get('/getAllCompanies', function(req, res, next) {

    Company.find({}, function (err, companies) {
        if (err)
            res.send(err);
        res.json(companies);
    });
});
router.post('/getCompany', function(req, res, next) {
	
    Company.find({ 'course': req.body.course, 'year': req.body.year, 'location': req.body.location }, function (err, companies) {
        if (err)
            res.send(err);
        res.json(companies);
    });
});

/**
  Updates a comment already in the database
 */
router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.update({_id:id}, req.body, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

/**
 * Delete a comment from the database
 */
router.delete('/removeComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.remove({_id:id}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully removed the document"});
    });
});

/* GET feed page. */
router.get('/feed', function(req, res, next) {

    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('feed');
        }
    }catch (err) {
            res.json({
                status: "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});

function verifyJwt(jwtString) {

    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}
module.exports = router;


