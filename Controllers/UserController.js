'use strict'

const mongoose = require('mongoose');
const userModel = require('../Models/User');
const validation = require('../Validations/models');
const responseFormat = require('../Utils/ResponseFormat');
const bcrypt = require('bcrypt');

let UserController = {

    signUp : (req, res) => {
        let newUser = new userModel(req.body);
        newUser.save((err, user) => {
            if (err){
                res.status(400).send(validation.validErrorGenerate("User", 'username', err));
            }else{
                res.send(responseFormat.responseFormat("User", [responseFormat.saveSuccess("User")]));  
            }
        });
    },

    logIn : (req, res) => {
      userModel.findOne({ username: req.body.username })
      .then(user =>{
        bcrypt.compare(req.body.password, user.hashed_password, function (err, result) {
          if (result === true) {
            res.send(responseFormat.responseFormat("User", [{id:user._id,displayName:user.displayname}]));
          } else {
            res.status(400).send(responseFormat.responseFormat("Username","incorrect username or password"));
          }
        });
      }).catch(err => {
        res.status(400).send(responseFormat.responseFormat("Username",[err.message])); 
      });   
    },
    getUserByID : (req, res) => {   
      if(!req.body.userid)
        res.send(validation.validFieldRequired("userid"));

      userModel.findById(mongoose.Types.ObjectId(req.body.userid))
          .then(data=>{
            if(!data)
              res.status(400).send(responseFormat.responseFormat('User','User no found')); 

            res.send(responseFormat.responseFormat("User",{userId:data._id,displayName:data.displayname}));
          })
          .catch(err =>{
              res.status(400).send(responseFormat.responseFormat("State",[err.message])); 
          })
  }
};

module.exports = UserController;