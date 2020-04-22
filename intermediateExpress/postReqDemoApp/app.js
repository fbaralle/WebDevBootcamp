console.log("Intermediate Express Post Requests: hello from app.js");

var express = require("express");
var app = express ();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

//makes the dir visible for clients, so html can show style or any resource needed (and seleted);
app.use(express.static("public"));
// tells the app to fill the render file name with ".ejs"
app.set("view engine", "ejs");

var friends = ["Tincho","Ricky","Breakbot","Pedro","Marquitos","Juampi"]

app.get("/", function (req, res) {
	res.render("home");
})


app.post("/addfriend", function (req, res) {
	var newFriend = req.body.newfriend;
	console.log(newFriend);
	friends.push(newFriend);
	res.redirect("friends");
})

app.get("/friends", function (req, res) {
	res.render("friends", {friends: friends});
})

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});