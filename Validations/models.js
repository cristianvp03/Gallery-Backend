'use strict'

const responseFormat = require('../Utils/ResponseFormat');

const validationModels = {

    CheckNull: (res,element,name) =>{
        if(!element){
            res.status(400).send(`The field ${name} cannot be null`);
            return true;
        }
        return false;
    },
    validErrorGenerate : (accion,field,error)=>{
        //if the error returned is by trying to add an existing record,
        // we show a simpler error
        if(error.code==11000){
            return responseFormat.responseFormat(400,accion,[validationModels.validFieldExists(field)])
        }else{
            return responseFormat.responseFormat(400,accion,[error.message]);
        }
    },
    validFieldRequired : (field)=>`The ${field} is required`,
    validFieldExists : (field)=>`The ${field} already exists`,
    validFieldLengthMin : (field,length)=> `The ${field} must be a minimum of ${length} characters`,
    validFieldLengthMax : (field,length)=> `The ${field} must be a maximum of ${length} characters`,   
    
    //Start:Validation Messages
   

}
 
module.exports = validationModels;