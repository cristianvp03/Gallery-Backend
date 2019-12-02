'use strict '

//Components
let express = require("express");
const fileUpload = require('express-fileupload');
const cors = require('cors');
let mongoDB = require("./Database/MongoConnection");
let ApiRoutes = require("./Routes/Api");
var path = require('path');
const envJson = require('./Utils/Environment');
//Instances
var app = express();
var port = envJson.PORT;


//middleware
app.use(fileUpload());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',ApiRoutes); //Load Routes
 

app.listen(port,()=>{
    console.log(`Server is Running on Port: ${port}`);
});


module.exports = app;