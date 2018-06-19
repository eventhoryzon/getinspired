var express = require('express');
var router = express.Router();
var multer  = require('multer');
var request = require('request');
var User = require('../model/user');
var newUser = require('../methods/searchactions');

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

module.exports = router;