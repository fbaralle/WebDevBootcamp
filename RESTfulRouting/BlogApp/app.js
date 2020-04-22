console.log("Blog App w/RESTful routing from app.js");

//npm install express body-parser ejs mongoose method-override express-sanitizer --save
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer");

//App CONFIG packages (database, view engine, body parser and stylesheet route)
mongoose.connect("mongodb://localhost:27017/blog-app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// express-sanitizer should go after body-parser
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Data base structure config - Mongoose model
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//RESTful routes

//INDEX ROUTE
app.get("/", function (req, res) {
	res.redirect("/blogs");
})

app.get("/blogs", function (req, res) {
	Blog.find({}, function (err, blogs) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	})
});

//NEW BLOG ROUTE (form input page)
app.get("/blogs/new", function(req, res) {
	res.render("new");
})

//CREATE BLOG ROUTE (sends the form to the database)
app.post("/blogs", function (req, res) {
	//sanitize input (prevents form users inserting scripts into the html body)
	req.body.blog.body = req.sanitize(req.body.blog.body);
	// create blog, store into database
	Blog.create(req.body.blog, function (err, newBlog) {
		if (err) {
			console.log(err);
		} else {
			//if no error, redirect to index
			res.redirect("/blogs")
		}
	})
})

//SHOW BLOG ROUTE (shows the blog using its database ID)
app.get("/blogs/:id", function (req, res) {
	Blog.findById(req.params.id, function (err, foundBlog) {
		if (err) {
			console.log(err);
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	})
	
})

// EDIT BLOG ROUTE (form to edit blog)
app.get("/blogs/:id/edit", function (req, res) {
	Blog.findById(req.params.id, function (err, foundBlog) {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	})
})

// UPDATE BLOG ROUTE (send data from form to update blog content)
app.put("/blogs/:id", function(req, res) {
	//sanitize input (prevents form users inserting scripts into the html body)
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
});

// DELETE BLOG ROUTE
app.delete("/blogs/:id", function (req, res) {
	Blog.findByIdAndRemove(req.params.id, function (err, deletedBlog) {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	})
});

app.listen(3000, function () {
	console.log("Server running on PORT 3000");
})