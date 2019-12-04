'use strict'

const express = require('express');
const welcomeController = require('../Controllers/WelcomeController');
const userController = require('../Controllers/UserController');
const photoController = require('../Controllers/PhotoController');
let route = express.Router();

//User
route.post('/User/singUp',userController.signUp);
route.post('/User/logIn',userController.logIn);
route.post('/User/getUser',userController.getUserByID)

//Photo
route.get('/Photo',photoController.Get);
route.get('/Photo/GetFilters',photoController.GetFilter);
route.post('/Photo',photoController.Post);
route.delete('/Photo',photoController.Delete)

//Welcome
route.get('/',welcomeController.home);


module.exports = route;