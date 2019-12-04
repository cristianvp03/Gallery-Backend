'use strict'

const responseFormat = require('../Utils/ResponseFormat');

let welcomeController = {

    home: (req, res) => res.send(responseFormat.responseFormat("Api is running", {})),

};

module.exports = welcomeController;