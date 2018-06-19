var User = require('../model/user');
var config = require('../config/config');
var mongoosastic = require('mongoosastic');

var functions = {
    addNewUser: function(req, res){
    //     if((!req.body.firstname)
    //     || (!req.body.lastname)  
    //     || (!req.body.mobilenumber)
    //     || (!req.body.email)
    //     || (!req.body.address)
    //     || (!req.body.city)
    //     || (!req.body.loc)
    //     || (!req.body.about)
    //     || (!req.body.interets)){
    //         res.json({success: false, msg:'Enter all Values'});

    //     }
    //  else{
        if(req.file){


            var path = req.file.path;
            var imageName = req.file.filename;
           
            var newUser = User({
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
            res.send(req.file);

            newUser.save(function(err, newUser){
                if(err){
                    console.log(err);
                    res.json({success: false, msg: 'Failed to Save'})
                }
                else{
                    res.json({success: true, msg:'User Registered Successfully'});
                }
            })
        }
       },
      
     getallusers: function(req,res){
  // Gets a list of Users
     User.find()
      .then(responseWithResult(res))
      .catch(handleError(res));
  

  function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
      console.error(err, statusCode);
      res.status(statusCode).send(err);
    };
  }
  function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
      if (entity) {
        res.status(statusCode).json(entity);
      }
    };
  }
   }
}
module.exports = functions;