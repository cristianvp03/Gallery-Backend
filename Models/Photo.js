'use strict'

const mongoose = require('mongoose');
const validation = require('../Validations/models');
const envJson =  require('../Utils/Environment');
const globalRoute = `${envJson.SERVERURL}uploads/`;


const Schema = mongoose.Schema;
var photoSchema = mongoose.Schema({
    name: {
        type: String, require: [true, validation.validFieldRequired('name')],
        index: { unique: false }
    },
    url: {
        type: String,
        default: ''
    },
    album: { 
        type: Schema.Types.ObjectId,
        require: [false, validation.validFieldRequired('album')],
        ref: "Album",
        default: null
    },
    user_id: { 
        type: Schema.Types.ObjectId,
        require: [true, validation.validFieldRequired('user ID')],
        ref: "User" 
    },
    createDate: {type:Date, default:Date.now}
});


photoSchema.pre("save", function (next) {
// store reference
    const photo = this;
    photo.url = `${globalRoute}/${photo.user_id}/${photo.name}`;
    next();
});

module.exports = mongoose.model('Photo', photoSchema);