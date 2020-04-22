console.log("Movie Search App");

var express = require("express");
var app = express ();
var request = require("request");

app.set("view engine", "ejs");

var searchG = "";



app.get("/", function (req, res) {
	res.render("home");
});

app.get("/results", function (req, res) {
	var query = req.query.search;
	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
	console.log("searching for.." + query);
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var results = JSON.parse(body);
			console.log(results);
			res.render("results", {results: results});
		}
	});
});

app.get("*", function (req, res) {
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Server listening on port 3000');	
});

// app.listen(3000, function() { 
//   console.log('Server listening on port 3000'); 
// });