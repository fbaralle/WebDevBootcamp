console.log("Express App 2; routes and requests practice");

var express = require ("express");
var app = express ();

const animals = {
	dog: "Wooof Woof!!" ,
	pig: "Oink Oink!",
	cat: "meooow",
	sheep: "meeeh",
	chicken: "pio pio pio"	
};

app.get("/", function (req, res) {
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function (req, res) {
	var speak = animals[req.params.animal];
	if (!!speak === false) {
		res.send ("Invalid animal, insert some of theese animals: dog, pig, cat, sheep or chicken");
	}
	else {
		res.send("The " + req.params.animal + " says " + speak.toUpperCase());
	};
});

app.get("/repeat/:word/:times", function (req, res) {
	var string = "";
	if (!!Number(req.params.times) === false) {
		res.send ("Invalid request, insert a valid number!");
	}
	for (var i = 0; i < Number(req.params.times); i++) {
		string += req.params.word.toUpperCase() + "<br> ===== <br>";
	}
	res.send (string);
});

app.get("*", function (req, res) {
	res.send("Sorry, page not found...What are you doing with your life, dude?");
});


app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});