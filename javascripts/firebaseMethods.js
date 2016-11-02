"use strict";

var FbAPI = (function(oldFirebase){

	oldFirebase.getTodos = function(apiKeys, uid){
		return new Promise((resolve, reject)=>{
			$.ajax({
				method: 'GET',
				url:`${apiKeys.databaseURL}/items.json?orderBy="uid"&equalTo="${uid}"` //got that first part from apiKeys.json
			}).then((response)=>{
				/*This is going to be used everytime we're using firebase to make arrays*/
				let items = []; //this is going to get messy, but we need to turn the objects into an array
				Object.keys(response).forEach(function(key){
					response[key].id = key; //sets the id for each object equal to the key value
					items.push(response[key]);
				});
				resolve(items);
				/*That's it right there*/
			}, (error) => {
				reject(error);
			});
		});
	};

	oldFirebase.addTodo = function(apiKeys, newItem){
		return new Promise((resolve, reject)=>{
			$.ajax({
				method: 'POST',
				url: `${apiKeys.databaseURL}/items.json`,
				data: JSON.stringify(newItem), //makes sure it is valid JSON
				dataType: 'json'
			}).then((response)=>{
				console.log("response from POST: ", response);
				resolve(response);
			}, (error) => {
				reject(error);
			});
		});
	};

	oldFirebase.deleteTodo = function(apiKeys, itemId){
		return new Promise((resolve, reject)=>{
			$.ajax({
				method: 'DELETE',
				url: `${apiKeys.databaseURL}/items/${itemId}.json`,
			}).then((response)=>{
				console.log("response from DELETE: ", response);
				resolve(response);
			}, (error) => {
				reject(error);
			});
		});
	};

	oldFirebase.editTodo = function(apiKeys, itemId, editedItem){
		return new Promise((resolve, reject)=>{
			$.ajax({
				method: 'PUT',
				url: `${apiKeys.databaseURL}/items/${itemId}.json`,
				data: JSON.stringify(editedItem), //makes sure it is valid JSON
				dataType: 'json'
			}).then((response)=>{
				console.log("response from PUT: ", response);
				resolve(response);
			}, (error) => {
				reject(error);
			});
		});
	};	


	return oldFirebase;
})(FbAPI || {});