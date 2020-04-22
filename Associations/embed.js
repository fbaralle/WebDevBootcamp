var mongoose = require("mongoose");

//App CONFIG packages (database, view engine, body parser and stylesheet route)
mongoose.connect("mongodb://localhost:27017/blog-app", {useNewUrlParser: true, useUnifiedTopology: true});

//Post schema (title, comment)
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

//User schema (email, name). Define each item of the database
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema] //the embed code-schema must be defined at first
});

// Define the collection of the database
var User = mongoose.model("User", userSchema);



