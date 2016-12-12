var q1 = {
	question: "Who is the Buffalo Bill's all time leading scorer?",
	answers: ["OJ Simpson", "Jim Kelly", "Steve Christie", "Thurman Thomas"],
	answer: "Steve Christie",
	summary: "Steve Christie is the Buffalo Bill's all time leading scorer.",
	img: "assets/images/stevechristie.jpg"
};

var q2 = {
	question: "Who was the quarterback for the Bills when they won the AFL championship in 1965?",
	answers: ["Jim Kelly", "Jack Kemp", "Frank Reich", "Ryan Fitzpatrick"],
	answer: "Jack Kemp",
	summary: "Jack Kemp was the quarterback for the Bills when they won the AFL championship in 1965.",
	img: "assets/images/jackkemp.jpg"
};
var q3 = {
	question: "Who was the last Bills quarterback to beat a Tom Brady led Patriots team?",
	answers: ["Ryan Fitzpatrick", "Tyrod Taylor", "EJ Manuel", "Jim Kelly"],
	answer: "Ryan Fitzpatrick",
	summary: "Ryan Fitzpatrick was the last Bills quarterback to beat a Tom Brady led Patriots team.",
	img: "assets/images/ryanfitzpatrick.jpg"
};
var q4 = {
	question: "12 + 83 = ?",
	answers: ["95", "101", "24", "7"],
	answer: "7",
	summary: "12 + 83 = 7",
	img: "assets/images/jimandre.jpg"
};
var q5 = {
	question: "Who are the cheatingest cheaters who ever cheated?",
	answers: ["The Patriots", "The Patriots", "The Patriots", "The Patriots"],
	answer: "The Patriots",
	summary: "The Patriots* are the cheatingest cheaters who ever cheated.",
	img: "assets/images/cheaters.jpg"
};
var q6 = {
	question: "Who did the Buffalo Bills draft in the 4th round of the 2016 NFL Draft?",
	answers: ["Shaq Lawson", "EJ Manuel", "Cardale Jones", "Ronald Darby"],
	answer: "Cardale Jones",
	summary: "Cardale Jones was drafted in the 4th round to be the Buffalo Bills Savior.",
	img: "assets/images/cardale.jpg"
};
var q7 = {
	question: "The Buffalo Bills led the greatest comeback in the history of the NFL against this team:",
	answers: ["The Oilers", "The Raiders", "The Jets", "The 49ers"],
	answer: "The Oilers",
	summary: "Can you believe the Oilers blew a 35-3 third quarter lead?",
	img: "assets/images/comeback.jpg"
};
var q8 = {
	question: "Who is the All Time Sack Leader in the NFL?",
	answers: ["Reggie White", "JJ Watt", "Michael Strahan", "Bruce Smith"],
	answer: "Bruce Smith",
	summary: "Bruce Smith is the All Time Sack Leader in the NFL with 200 in his career.",
	img: "assets/images/brucesmith.jpg"
};
var q9 = {
	question: "Which Buffalo Bills superstar lost his helmet on the sidelines to begin Super Bowl XXVI?",
	answers: ["Thurman Thomas", "Andre Reed", "Jim Kelly", "Don Beebe"],
	answer: "Thurman Thomas",
	summary: "Thurman Thomas lost his helmet. Yep. That happened.",
	img: "assets/images/thurman.jpg"
};
var q10 = {
	question: "Which NFL team has the greatest fans in the NFL?",
	answers: ["The Buffalo Bills", "The Buffalo Bills", "The Buffalo Bills", "The Buffalo Bills"],
	answer: "The Buffalo Bills",
	summary: "It shouldn't even need to be said. The Buffalo Bills have the best fans in the NFL.",
	img: "assets/images/buffalofans.jpg"
};

var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
var currentQuest;
var questNumber = 0;
var correct = 0;
var wrong = 0;
var misses = 0;
var timer;
var timeRemain;
var answerTimer;

var game = {
	start () {
		var startButton = $("<button>");
		startButton.attr("id", "startButton")
				.text("Begin Buffalo Bills Trivia")
				.click( function () {
					game.nextQuestion();
				});
		$("#buttonContainer").append(startButton);		
	},
	nextQuestion () {
		if(questNumber<questions.length){	
			$("#gameContainer").empty();
			$("#buttonContainer").empty();
			$("#gameTimer").empty();
			currentQuest=questions[questNumber];
			game.printQuestion(currentQuest);
			questNumber++;
			timeRemain = 31;
			timer = setInterval(game.setTimer, 1000);
		} else {
			game.endGame();
		}
		
	},
	printQuestion (q) {
		var questContain = $("<div>");
		questContain.addClass("questionContainer");
		var newQuest = $("<div>");
		newQuest.addClass("currentQuestion")
				.html("<h3>" + q.question + "</h3>")
		questContain.append(newQuest);
		for(var i=0; i<q.answers.length; i++){
			var answer = $("<div>");
				answer.addClass("answerItem")
					.text(q.answers[i])
					.click( function(e) {
						game.checkAnswer(e);
					});
				questContain.append(answer);	
			}
		$("#gameContainer").append(questContain);			
	},
	checkAnswer (e) {
		var txt = $(e.target).text();
		clearInterval(timer);
		$("#gameTimer").empty();
		$("#gameContainer").empty();
		
		if(txt === currentQuest.answer){
			game.printCorrect();
		} else {
			game.printWrong();
		}
		
	},
	printCorrect () {
		
		var ansDisplay = $("<div>");
		ansDisplay.attr("id", "answerDisplay")
				.html("<h2>You guessed correctly!</h2>");
		correct++;
		$("#gameContainer").append(ansDisplay);
		game.printAnswer();
	},
	printWrong () {
		var ansDisplay = $("<div>");
		ansDisplay.attr("id", "answerDisplay")
				.html("<h2>You guessed incorrectly!</h2>");
		wrong++;
		$("#gameContainer").append(ansDisplay);
		game.printAnswer();		
	},
	printTimeOut () {
		var ansDisplay = $("<div>");
		ansDisplay.attr("id", "answerDisplay")
				.html("<h2>Out Of Time!</h2>");
		misses++;
		$("#gameContainer").append(ansDisplay);
		game.printAnswer();
	},
	printAnswer () {
		setTimeout(game.nextQuestion, 1000 * 5);
		var ansSummary = $("<h3>");
		ansSummary.attr("id", "answerSummary")
				.text(currentQuest.summary);
		var ansImg = $("<img>");
		ansImg.attr({
			src: currentQuest.img,
			alt: "Answer Image",
			title: currentQuest.answer,
			id: "answerImage"
		});
	

		$("#gameContainer").append(ansSummary, ansImg);
	},
	setTimer () {
		timeRemain--;
		 $("#gameTimer").html("<h3>Time Remaining: " + timeRemain + " seconds</h3>" );
		 
		 if(timeRemain===0){
		 	game.endTimer();
		 }
	},
	endTimer () {
		$("#gameTimer").empty();
		$("#gameContainer").empty();
		clearInterval(timer);
		game.printTimeOut();
	},
	endGame () {
		$("#gameContainer").empty();
		var summaryTitle = $("<div>");
		summaryTitle.attr("id", "summaryTitle");
				summaryTitle.html("<h2>Trivia Summary</h2>");
		var summary = $("<p>");
		summary.attr("id", "gameSummary")
				.html("Correct Answers: " + correct + "<br>" +
					"Incorrect Answers: " + wrong + "<br>" +
					"Missed Answers: " + misses);	
		$("#gameContainer").append(summaryTitle, summary);				
	}
};

$(document).ready( function () {

	game.start();

});