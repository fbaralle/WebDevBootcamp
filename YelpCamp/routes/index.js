var express = require ("express"),
	router = express.Router(),
	User = require ("../models/user"),
	passport = require ("passport");

// ROOT Route
router.get("/", function (req, res) {
	res.render("landing");
});


// AUTH Routes
// =============

// SIGN UP
router.get("/register", function (req, res) {
	res.render("register");
});

router.post("/register", function (req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("back");
		}
		passport.authenticate("local")(req, res, function () {
			req.flash("success","Welcome to Yelp Camp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// LOGIN -----------

// login form
router.get("/login", function (req, res) {
	res.render("login");
});

// handles login logic and authentication
// the "middleWare" (passport.authenticate(< / >)) runs between the route and the handler or the callback function. It supports multiple middlewares and multiple authentication processes

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function (req, res) {
	//nothing needed here, due to midleware auth process (login, middleware, callback)
});

//LOGOUT -----------

router.get("/logout", function (req, res) {
	req.logout();
	req.flash("info","Logged out");
	res.redirect("/campgrounds");
});

module.exports = router;