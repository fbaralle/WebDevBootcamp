console.log("Intro To Express: hello form app.js");

var express = require("express");
var app = express ();

// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
  res.send("Goodbye!!");
});

app.get("/dog", function (req, res) {
	console.log("someone send a request to dog");
	res.send("Woof Woof!!");
})

// esta ruta va a lo ultimo porque el orden importa: el programa
// responde a la primera request que detecta, y luego no se fija
// si se cumple o coincide con el resto del programa, por eso esta req que coincide con todo
// debe ir a lo ultimo.
// any invalid request ('*' matches everygthing) shows some error message 
app.get ("*", function (req, res) {
	res.send("INVALID: that directory doesn't exist!!!");
})

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});