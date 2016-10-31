"use strict";

var idCounter = 0;


$(document).ready(function(){
	console.log("jQuery is ready");
	$('#submit-button').on('click', () => {
		console.log("You pressed Submit");
		
		idCounter = idCounter + 1; 

		//Takes user input and outputs it into the To Do section of html
		var inputText = $('#todo-input-bar').val();
		console.log("To-Do item created: ", inputText);

		$('.todo-list').append('<div id="todo-' + idCounter + '">' + '<textarea type=text class="form-control" id="todo-text-' + idCounter + '"' + '>' + inputText + '</textarea>' + '<button class="btn btn-primary btn-lg completeBtn" id="complete-' + idCounter + '">COMPLETED!</button>' + '<button class="btn btn-md editBtn" id="edit-' + idCounter + '">Edit</button>' + '<button class="btn btn-md deleteBtn" id="delete-' + idCounter + '">Delete</button>' + '<button class="btn btn-md uncompleteBtn" id="uncomplete-' + idCounter + '">Uncomplete</button>' + '</div>');
		$('#uncomplete-' + idCounter).hide();
		
		//Clears the input bar after submission
		$('#todo-input-bar').val('');			
	

		//Delete Button
		//Targets the Parent div and removes it from the HTML entirely
		$('#delete-' + idCounter).on('click', () => {		
			console.log("Delete button pressed");
			$(event.target).parent().remove();
		});

		//Edit Button
		$('#edit-' + idCounter).on('click', () => {
		//	$(event.target).siblings('textarea').append('blah');
		});
		
		//Completed Functionality
		$('#complete-' + idCounter).on('click', () => {
			$(event.target).parent().appendTo('#completed-items-output');
			$(event.target).siblings('.uncompleteBtn').show();
			$(event.target).hide();
			$(event.target).siblings('.editBtn').hide();
			$(event.target).siblings('.deleteBtn').hide();
		});

		//Uncompleted Functionality
		$('#uncomplete-' + idCounter).on('click', () => {
			$(event.target).parent().appendTo('#todo-items-output');
			$(event.target).hide();
			$(event.target).siblings('.completeBtn').show();
			$(event.target).siblings('.editBtn').show();
			$(event.target).siblings('.deleteBtn').show();
		});
	});		
});



//$('"#todo-' + idCounter + '"')
//$(event.target).parent().remove();
			//console.log($(event.target).parent());