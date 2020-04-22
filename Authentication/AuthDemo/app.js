console.log("Auth app.js")
//npm install --save (express; express-session;
// ejs; body-parser; mongoose; passport; passport-local; passport-local-mongoose)

var express = require ("express"),
	app = express (),
	mongoose = require ("mongoose"),
	bodyParser = require ("body-parser"),
	passport = require ("passport"),
	LocalStrategy = require ("passport-local"),
	passportLocalMongoose = require ("passport-local-mongoose"),
	User = require ("./models/user");

mongoose.connect("mongodb://localhost:27017/auth-demo-app", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(require("express-session")({
	secret: "Breakbot is cool",
	resave: false,
	saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

//takes data from the session and encodes it
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//ROUTES
//===========

app.get("/", function (req, res) {
	res.render("home");
});

app.get("/secret", isLoggedIn, function (req, res) {
	res.render("secret");
});

// Auth Routes -------

//form 
 app.get("/register", function (req, res) {
	res.render("register");
 });

//authentication post route handler
app.post("/register", function (req, res) {
	User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function () {
			res.redirect("/secret");
		});
	});
});

// Login routes-----

// Login form
app.get("/login", function (req, res) {
	res.render("login");
});

// Login logic
// the "middleWare" (passport.authentication(< / >)) runs between the route and the handler or the callback function. It supports multiple middlewares and multiple authentication processes
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function (req, res){
	//nothing needed here
});

//Logout
app.get("/logout", function (req, res) {
	req.logout(); //passport method to log the user out (destroys the user session from the DB)
	res.redirect("/");
});

//middleware function. The "next" argument lets the middleware move on to the next middleware or the final callback function
function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};






app.listen(3000, function () {
	console.log("Auth Server running on Port 3000")
	});