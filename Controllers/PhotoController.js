'use strict'

const fs = require('fs');
const mongoose = require('mongoose');
const photoModel = require('../Models/Photo');
const validate = require('../Validations/models');
const responseFormat = require('../Utils/ResponseFormat');
const globalPath = `${process.cwd()}/public/uploads/`;

let PhotoController = {

    Get: (req, res) => {
        let perPage = req.query.perPage;
        let page = req.query.page;

        photoModel.find({user_id:mongoose.Types.ObjectId(req.query.userid)})
        .then(data => {
            res.send(responseFormat.responseFormat(200, "Photo", data));
        }).catch(err => {
            res.status(400).send(responseFormat.responseFormat(400, "Photo", [err.message]));
        });
    },
    Post: (req,res) => {        
        let statusProcess = false;
        if(req.files){
                req.files.filename.forEach((file,index)=>{
                    let fileName = file.name;
                    createFolder(req.query.userid);
                    file.mv(`${globalPath}${req.query.userid}/${fileName}`,err=>{
                        if(err){ statusProcess = false; }
                        let Photo = new photoModel({
                            name : fileName,
                            album : req.body.album,
                            user_id : mongoose.Types.ObjectId(req.query.userid)
                        });
                        Photo.save((err) => {
                            if (!err) { statusProcess=true;} 
                        });
                    });            
                });        
        }
        
        if(statusProcess){
            res.send(responseFormat.responseFormat(200, "Photo", [responseFormat.saveSuccess("Photo")]));
        }else{
            res.send(responseFormat.errorOccurred());
        }           
    },
    Delete : (req,res)=>{
        photoModel.findOneAndDelete({_id:mongoose.Types.ObjectId(req.query.idPhoto)}, err => {
            if (err) {
                res.status(400).send(validate.validErrorGenerate("Photo", 'Photo Delete', err));
            }else{
                
                try {
                    fs.unlinkSync(`${globalPath}${req.query.userid}/${req.query.name}`)
                    //file removed
                } catch(err) {
                    console.error(err)
                }
                res.send(responseFormat.removeSuccess("Photo"));
            }            
        })
    },
    GetFilter : (req,res) =>{
        photoModel.find({
            name:new RegExp(req.query.name,'i'),
            user_id:mongoose.Types.ObjectId(req.query.userid)
        })
        .then(data => {
            res.send(responseFormat.responseFormat(200, "Photo", data));
        }).catch(err => {
            res.status(400).send(responseFormat.responseFormat(400, "Photo", [err.message]));
        });
    }

};

function createFolder(namefolder){
    let dir = `${globalPath}${namefolder}`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
} 

module.exports = PhotoController;