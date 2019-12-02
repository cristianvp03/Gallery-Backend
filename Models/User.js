'use strict'

const mongoose = require('mongoose');
const validation =require('../Validations/models');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var UserSchema = mongoose.Schema({
    displayname:{
        type: String , require:[true,validation.validFieldRequired('Displayname')],
        index: {unique:false}
    },
    username: {
         type: String , require:[true,validation.validFieldRequired('Username')],
         index: {unique:true},
         minlength:[3,validation.validFieldLengthMin('Username',3)],
         maxlength:[30,validation.validFieldLengthMax('Username',30)]
    },
    hashed_password: {
        type: String,
        default: ''
    },
    createDate:{ type:Date, default:Date.now }
});

// Virtuals
UserSchema.virtual('password').set(function (password) {
        this._password = password;
});

UserSchema.pre("save", function (next) {
    // store reference
    const user = this;
    if (user._password === undefined) {
        return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) console.log(err);
        // hash the password using our new salt
        bcrypt.hash(user._password, salt, function (err, hash) {
            if (err) console.log(err);
            user.hashed_password = hash;
            next();
        });
    });
});

/**
 * Methods
*/
UserSchema.methods = {
    comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }
}

module.exports = mongoose.model('User', UserSchema);
