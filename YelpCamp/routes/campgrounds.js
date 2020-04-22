var express = require ("express"),
	router = express.Router(),
	Camp = require ("../models/campgrounds"),
	Comment = require ("../models/comments"),
	middleware = require("../middleware"); //looks for "index.js" bu default


// CAMPGROUNDS Routes -----------

router.get("/", function (req, res) {
	Camp.find({}, function (err, allCamps) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCamps});
		}
	})
});

// CREATE Routes -----------
// Create new Camp form
router.get ("/new", middleware.isLoggedIn, function (req, res) {
	res.render("campgrounds/new");
});

// Create form post request
router.post ("/", middleware.isLoggedIn, function (req, res){
	var name = req.body.name;
	var image = req.body.image;
	var location = req.body.location;
	var description = req.body.description;
	var price = req.body.price;
	var author = {
					id: req.user._id,
					username: req.user.username
				};
	var newCamp = {
					name: name,
					image: image,
					location: location,
					description: description,
					price: price,
					author: author
				};
	Camp.create(newCamp, function (err, campCreated) {
		if (err) {
			console.log(err);
		} else {
			console.log(campCreated);
			req.flash("success","Campground post created successfully");
			res.redirect("/campgrounds");
		}
	})
});

// SHOW Routes -----------

//shoud be the last route so the program can't get confused with the previouse one "/campgrounds/new",
// that has the same structure
router.get("/:id", function (req, res) {
	// req.params.id refers to the link part /:id of the structure.
	// populate("comments") means that the comments are added to the Camp object (fills the array of comments objects), taking them from the comments data base
	Camp.findById(req.params.id).populate("comments").exec( function (err,foundCamp) {
		if (err || !foundCamp) {
			req.flash("error","Campground not found");
			res.redirect("back");
		} else {
			res.render("campgrounds/show", {campground: foundCamp});
		}
	})
});

// EDIT campground Route (to the form)
router.get("/:id/edit", middleware.checkCampOwnership, function (req, res) {
	Camp.findById(req.params.id, function (err, foundCamp) {
		if (err || !foundCamp) {
			req.flash("error","Campground not found");
			res.redirect("/campgrounds");
		} else {
			res.render("campgrounds/edit", {campground: foundCamp});	
		}
	});
});


// UPDATE campground route (where the edit form subits data)
router.put("/:id", middleware.checkCampOwnership, function (req, res) {
	Camp.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCamp) {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			req.flash("success","Post updated successfully");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DELETE route
router.delete("/:id", middleware.checkCampOwnership, function (req, res) {
	Camp.findByIdAndRemove(req.params.id, function (err, removedCamp) {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			//deletes the comments in the camp post
			Comment.deleteMany({_id: {$in: removedCamp.comments}}, function () {
				if (err) {
					console.log(err);
				} else {
					req.flash("info","Campground removed");
					res.redirect("/campgrounds");
				}
			});
		}
	});
});


module.exports = router;
