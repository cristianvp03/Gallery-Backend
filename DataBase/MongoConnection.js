'use strict'

const mongoose = require('mongoose');
const stringConnection = 'mongodb+srv://cvp:cvp123@cluster0-4ue7n.mongodb.net/gallery?retryWrites=true&w=majority';

mongoose.connect(stringConnection,{
    useNewUrlParser : true,
    useCreateIndex: true,
    useFindAndModify:false,
    useUnifiedTopology: true
});

module.exports = mongoose;