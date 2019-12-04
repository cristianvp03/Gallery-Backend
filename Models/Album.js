'use strict'

const mongoose = require('mongoose');
const validation =require('../Validations/models');

const Schema = mongoose.Schema;
var albumSchema = mongoose.Schema({
    name: {
        type: String, require: [true, Constants.validFieldRequired('name')],
        index: { unique: true },
        minlength: [3, Constants.validFieldLengthMin('name', 3)],
        maxlength: [50, Constants.validFieldLengthMax('name', 50)]
    },
    username: { 
        type: Schema.Types.ObjectId,
        require: [true, validation.validFieldRequired('username')],
        ref: "User" 
    }
});

module.exports = mongoose.model('Album', albumSchema);