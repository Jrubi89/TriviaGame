
$(document).ready(function () {
      var options = [
    {
        question: "Robin Scherbatsky was a famous Canadian teen pop star in the 1990s. What was the name of her character on the Canadian kids' show?", 
        choice: ["Robin", "Robin Glitter", "Sparkles", "Robin Sparkles"],
        answer: 3,
		photo: "assests/images/Robin_Sparkles.jpg"
    }, 
    {
	 	question: "What was the name of the Canadian kids' show Robin Sparkles starred on?", 
		choice: ["Space Teens", "Teen Glow", "Speak Up Kids", "Coke"],
		answer: 0,
		photo: "assests/images/space_teens.png"
	 }, 
	 {
	 	question: "What is the name of Ted and Barney's legendary bar?", 
		choice: ["Pieces", "Legendary", "Puzzles", "No last call" ],
		answer: 2,
		photo: "assests/images/Puzzles.jpg"
	}, 
	{
		question: "Who did Barney end up marrying?", 
		choice: ["Victoria", "Ashley", "Robin", "Lily" ],
		answer: 2,
		photo: "assests/images/Robin.jpg"
	}, 
	{
		question: "Who did Barney think was his father?", 
		choice: ["Regis Philbin", "He never knew", "Bob Stinson", "Bob Barker" ],
		answer: 3,
		photo: "assests/images/Barker.jpg"
	}, 
	{
		question: "What did Ted want to name his kids?", 
		choice: ["Iain and Sarah", "Luke and Penny", "Robin", "Luke and Leia" ],
		answer: 3,
		photo: "assests/images/herring.jpg"
	}, 
	{
		question: "Which character had a stripper doppelganger??", 
		choice: ["Victoria", "Ashley", "Robin", "Lily" ],
		answer: 3,
		photo: "assests/images/doppelganger.jpg"
	}, 
	{
		question: "The Bro Code is a set of rules for?", 
		choice: ["male etiquette", "work performance", "Roomates", "Drinking" ],
		answer: 0,
		photo: "assests/images/etiquette.jpg"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];

$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();
})
})
