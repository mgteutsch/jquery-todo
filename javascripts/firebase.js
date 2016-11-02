"use strict";

//Need to create and IIFE, using FbAPI as the variable

var FbAPI = (function(){
    return {
        firebaseCredentials: function(){
            return new Promise((resolve, reject)=>{
                $.ajax({
                    method: "GET",
                    url: `apiKeys.json`
                }).then((response)=>{
                    resolve(response);
                },(error)=>{
                    reject(error);
                });
            });
        }
    };
})();