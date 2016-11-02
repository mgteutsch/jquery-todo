"use strict";

let apiKeys = {};
let uid = "";

function putTodoInDOM (){
	FbAPI.getTodos(apiKeys, uid).then(function(items){
			console.log("items from Firebase: ", items);
			$('#completed-tasks').html(""); //wipes out the id
			$('#incomplete-tasks').html(""); //wipes out the id
			items.forEach(function(item){
				if(item.isCompleted === true){
					let newListItem = `<li data-completed="${item.isCompleted}">`;
				    newListItem+=`<div class="col-xs-8" data-firebaseid="${item.id}">`;
				    newListItem+='<input class="checkboxStyle" type="checkbox" checked>';
				    newListItem+=`<label class="inputLabel">${item.task}</label>`;
				    newListItem+='<input type="text" class="inputTask">';
					newListItem+='</div>';
				    newListItem+='<div class="col-xs-4">';
				    newListItem+='</div>';
				    newListItem+='</li>';
	      			//apend to list
	      			$('#completed-tasks').append(newListItem);
      			} else {
      				let newListItem = `<li data-completed="${item.isCompleted}">`;
				    newListItem+=`<div class="col-xs-8" data-firebaseid="${item.id}">`;
				    newListItem+='<input class="checkboxStyle" type="checkbox">';
				    newListItem+=`<label class="inputLabel">${item.task}</label>`;
				    newListItem+='<input type="text" class="inputTask">';
					newListItem+='</div>';
				    newListItem+='<div class="col-xs-4">';
				    newListItem+=`<button class="btn btn-default col-xs-6 edit" data-firebaseid="${item.id}">Edit</button>`;
				    newListItem+=`<button class="btn btn-danger col-xs-6 delete" data-firebaseid="${item.id}">Delete</button> `;
				    newListItem+='</div>';
				    newListItem+='</li>';
	      			//apend to list
	      			$('#incomplete-tasks').append(newListItem);
      			}

			});
		});
}


$(document).ready(function(){
	FbAPI.firebaseCredentials().then(function(keys){
		console.log("keys", keys);
		apiKeys = keys; //allows apiKeys to be public (look at the let function above)
		firebase.initializeApp(apiKeys); //for authorization
		//putTodoInDOM(); ---> this was removed once we added verification; now it's under uid = loginResponse.uid;
		/* FbAPI.getTodos(apiKeys).then(function(items){
			console.log("items from Firebase: ", items);
		}); */ 
		//this here we put up, and put it into the function putTodoInDOM()
		//now, it's called down here because we did putTodoInDOM() down here
	});

	$('#submit-button').on('click', function(){
		let newItem = {
			"task": $('#todo-input-bar').val(),
			"isCompleted":false
		};

		FbAPI.addTodo(apiKeys, newItem).then(function(){
			putTodoInDOM();
		});
	});

$('ul').on("click", ".delete", function(){
	let itemId = $(this).data("firebaseid");
	FbAPI.deleteTodo(apiKeys, itemId).then(function(){
		putTodoInDOM(); //after you delete, you need to refresh the DOM!
	});
});

$('ul').on("click", ".edit", function(){
	let itemId = $(this).data("firebaseid");
	let parent = $(this).closest("li");
	if (!parent.hasClass("editMode")) { //! means if the parent does NOT have the class "editMode"
		parent.addClass("editMode");
	} else {
		let itemId = $(this).data("firebaseid");
		let editedItem = {
			"task": parent.find(".inputTask").val(),
			"isCompleted": false
		};
		FbAPI.editTodo(apiKeys, itemId, editedItem).then(function(response) {
			parent.removeClass("editMode");
			putTodoInDOM();
		});
	}
});

$('ul').on("change", 'input[type="checkbox"]', function(){
  let updatedIsCompleted = $(this).closest("li").data("completed");
  let itemId = $(this).parent().data("firebaseid");
  let task = $(this).siblings(".inputLabel").html();
  console.log("updatedIsCompleted: ",updatedIsCompleted); 
  console.log("itemId: ", itemId);
  let editedItem = {
    "task": task,
    "isCompleted": !updatedIsCompleted
  };
  FbAPI.editTodo(apiKeys, itemId, editedItem).then(function(){
    putTodoInDOM();
  });
});

$('#registerButton').on('click', function() {
	let email = $('#inputEmail').val();	
	let password = $('#inputPassword').val();

	let user = {
		"email": email,
		"password": password
	};

	FbAPI.registerUser(user).then(function(response) {
		console.log("register response: ", response);
		return FbAPI.loginUser(user);		
	}).then(function(loginResponse){
		console.log("login response", loginResponse);
		uid = loginResponse.uid;
		putTodoInDOM();
		$('#login-container').addClass("hide");
		$('#todo-container').removeClass("hide");
	});
});

$('#loginButton').on('click', function() {
	let email = $('#inputEmail').val();	
	let password = $('#inputPassword').val();

	let user = {
		"email": email,
		"password": password
	};
	FbAPI.loginUser(user).then(function(loginResponse){
		uid = loginResponse.uid;
		putTodoInDOM();
		$('#login-container').addClass("hide");
		$('#todo-container').removeClass("hide");
	});

});




});






/* Before Firebase: */

// var idCounter = 0;


// $(document).ready(function(){
// 	console.log("jQuery is ready");
// 	$('#submit-button').on('click', () => {
// 		console.log("You pressed Submit");
		
// 		idCounter = idCounter + 1; 

// 		//Takes user input and outputs it into the To Do section of html
// 		var inputText = $('#todo-input-bar').val();
// 		console.log("To-Do item created: ", inputText);

// 		$('.todo-list').append('<div id="todo-' + idCounter + '">' + '<textarea type=text class="form-control" id="todo-text-' + idCounter + '"' + '>' + inputText + '</textarea>' + '<button class="btn btn-primary btn-lg completeBtn" id="complete-' + idCounter + '">COMPLETED!</button>' + '<button class="btn btn-md editBtn" id="edit-' + idCounter + '">Edit</button>' + '<button class="btn btn-md deleteBtn" id="delete-' + idCounter + '">Delete</button>' + '<button class="btn btn-md uncompleteBtn" id="uncomplete-' + idCounter + '">Uncomplete</button>' + '</div>');
// 		$('#uncomplete-' + idCounter).hide();
		
// 		//Clears the input bar after submission
// 		$('#todo-input-bar').val('');			
	

// 		//Delete Button
// 		//Targets the Parent div and removes it from the HTML entirely
// 		$('#delete-' + idCounter).on('click', () => {		
// 			console.log("Delete button pressed");
// 			$(event.target).parent().remove();
// 		});

// 		//Edit Button
// 		$('#edit-' + idCounter).on('click', () => {
// 		//	$(event.target).siblings('textarea').append('blah');
// 		});
		
// 		//Completed Functionality
// 		$('#complete-' + idCounter).on('click', () => {
// 			$(event.target).parent().appendTo('#completed-items-output');
// 			$(event.target).siblings('.uncompleteBtn').show();
// 			$(event.target).hide();
// 			$(event.target).siblings('.editBtn').hide();
// 			$(event.target).siblings('.deleteBtn').hide();
// 		});

// 		//Uncompleted Functionality
// 		$('#uncomplete-' + idCounter).on('click', () => {
// 			$(event.target).parent().appendTo('#todo-items-output');
// 			$(event.target).hide();
// 			$(event.target).siblings('.completeBtn').show();
// 			$(event.target).siblings('.editBtn').show();
// 			$(event.target).siblings('.deleteBtn').show();
// 		});
// 	});		
// });
