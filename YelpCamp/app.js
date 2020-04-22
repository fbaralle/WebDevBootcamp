console.log("Yelp Camp app.js");

var express = require ("express"),
	app = express (),
	bodyParser = require ("body-parser"),
	methodOverride = require ("method-override"),
	flash = require ("connect-flash"),
	mongoose = require ("mongoose"),
	passport = require ("passport"),
	LocalStrategy = require ("passport-local"),
	passportLocalMongoose = require ("passport-local-mongoose"),
	Camp = require ("./models/campgrounds"),
	Comment = require ("./models/comments"),
	User = require ("./models/user");
	//seedDB = require ("./seeds");

// Requiring routes
var commentRoutes = require ("./routes/comments"),
	campgroundRoutes = require ("./routes/campgrounds"),
	indexRoutes = require ("./routes/index");

//seedDB();

// app, packages and database set up
//====================================

//DATABASE Connect
//===================
//process.env.DATABASE details on Resources.txt file
var databaseURL = process.env.DATABASEURL || "mongodb://localhost:27017/yelp-camp-app"

mongoose.connect(databaseURL,
				 {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then (() => {
	console.log("Connected to DataBase: DATABASEURL=",process.env.DATABASEURL);
}).catch(err => {
	console.log("ERROR:", err.message);
});


// passport config
app.use(require("express-session")({
	secret: "fran123",
	resave: false,
	saveUninitialized: false
}));
// flash config needs to be declared befor passport config
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// encodes data from the session opened for each user
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// body-parser, ejs and public dir (styles and front apps) config
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");



//"app.use" uses the function provided in EVERY route
// this function is a middleware that passes through the current User name so it can be shown in the header
app.use(function (req, res, next) {
	// passes the object on every template
	res.locals.currentUser = req.user;
	// passes the flash message to next page, on every template
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.info = req.flash("info");
	//IMPORTANT!! add next () function so it can move on..
	next();
});

//Routing files declaration
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT || 3000, function() {
	console.log('Server listening on port 3000');	
});

//app.listen(3000, function () {
//	console.log("Yelp Camp Server running on Port 3000")
//	});