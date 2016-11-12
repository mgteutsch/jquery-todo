"use strict";

var FbAPI = (function(oldFirebase) {

	oldFirebase.getUser = function(apiKeys, uid) {
		return new Promise((resolve, reject)=>{
			$.ajax({
				method: 'GET',
				url:`${apiKeys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"` //copied this from GET in Methods.js, replaced items with users
			}).then((response)=>{
				let users = []; 
				Object.keys(response).forEach(function(key){
					response[key].id = key; //sets the id for each object equal to the key value
					users.push(response[key]);
				});
				resolve(users[0]); // needed to add [0] to return an array of one thing
			}, (error) => {
				reject(error);
			});
		});
	};

	oldFirebase.addUser = function(apiKeys, newUser) {
		return new Promise((resolve, reject)=>{
			$.ajax({
				method: 'POST',
				url:`${apiKeys.databaseURL}/users.json`, //copied this from GET in Methods.js, replaced items with users
				data: JSON.stringify(newUser),
				dataType: 'json'
			}).then((response)=>{
				resolve(response); // needed to add [0] to return an array of one thing
			}, (error) => {
				reject(error);
			});
		}); 
	};	

	return oldFirebase;

})(FbAPI || {});