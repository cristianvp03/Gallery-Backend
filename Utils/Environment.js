'use strict'

//import
const envJson = require('../env.json');
const node_env = process.env.NODE_ENV || "development";

//export
module.exports =envJson[node_env];