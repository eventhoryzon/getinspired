var express = require('express');
var router = express.Router();
var multer  = require('multer');
var request = require('request');
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var User = require('../model/user');
var newUser = require('../methods/searchactions');
var Search = mongoose.model('Search');

var searchactions = require('../methods/searchactions');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
  cb(null, './profile/')
  },
  filename: function(req, file, cb) {
  return cb(null, file.fieldname + "_" + Date.now()+".jpg");

  }
 });
  
 var upload = multer({
  storage: storage
 })

router.post('/addNewUser',upload.single('imagepath'), function(req,res){
if(req.file){


  var path = req.file.path;
  var imageName = req.file.filename;
  console.log("File Uploaded");

 
  var newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      imagepath : path,
      originalname : imageName,
      number: req.body.number,
      email: req.body.email,
      address : req.body.address,
      city : req.body.city,
      loc : req.body.loc,
      about : req.body.about,
      interests : req.body.interests,
  });
  console.log("User Checked");
  


 console.log("File Sent");
   
  newUser.save(function(err, newUser){
      if(err){
          res.json({success: false, msg: 'Failed to Save'})
      }
      else{
        return res.send(req.file);
        console.log("User Saved Success");
          res.json({success: true, msg:'User Registered Successfully'});
      }
  })
}
});

router.get('/getallusers' , newUser.getallusers);




Search.createMapping(function(err, mapping){
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  }else{
    console.log('mapping created!');
    console.log(mapping);
  }
});

router.post("/search/", function(req,res) {
  var terms=req.body.terms;
  Search.find({ 'firstname': new RegExp(terms, 'i') } , function(err,books,count) {
    res.render("search", { terms:terms, users:users })
  });
});

router.get("/esearch/", function(req,res) {
  res.render("esearch");
});

router.post("/esearch/", function(req,res) {
  var terms=req.body.terms;
  Search.search({ query_string: { query:terms } }, function(err,results) {
    res.render("esearch", { terms:terms, users:results.hits.hits })
  });
});

router.get("/hesearch/", function(req,res) {
  res.render("hesearch");
});

router.post("/hesearch/", function(req,res) {
  var terms=req.body.terms;
  Search.search({ query_string: { query:terms } }, { hydrate:true }, function(err,results) {
    res.render("hesearch", { terms:terms, users:results.hits.hits })
  });
});



module.exports = router;