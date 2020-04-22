console.log("Intermediate Express: hello form app.js");

var express = require("express");
var app = express ();

//makes the dir visible for clients, so html can show style or any resource needed (and seleted);
app.use(express.static("public"));
// tells the app to fill the render file name with ".ejs"
app.set("view engine", "ejs");

app.get("/:name", function (req, res) {
	var name = req.params.name;
	res.render("home", {name: name});
})

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});