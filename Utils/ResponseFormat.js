'use strict'


const response = {

    responseFormat : (statusCode=undefined,Description="",Data=undefined) =>{
        return {"statusCode":statusCode,"Description":Description,"Data":Data};
    },
    saveSuccess: accion => `${accion} saved successfully`,
    removeSuccess: accion => `${accion} remove successfully`,
    updateSuccess: accion => `${accion} update successfully`,
    errorOccurred: _ => 'An unexpected error has occurred'
    
} 

module.exports = response;