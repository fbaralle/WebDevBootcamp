var	Camp = require ("../models/campgrounds"),
	Comment = require ("../models/comments");

// middleware functions
var middlewareObj = {};

// -- AUTHENTICATION -- middleware
//checks if user is logged in
middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error","You need to be logged in to do that");
	res.redirect("/login");
};

// -- AUTHORIZATION -- middleware
//checks if the user logged in is the owner of the element it's trying to modify
middlewareObj.checkCampOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		Camp.findById(req.params.id, function (err, foundCamp) {
			if (err || !foundCamp) {
				req.flash("error","Campground not found");
				res.redirect("back");
			} else {
				// *.equals is a mongoose method to compare ids with same content but different type of data (object and string) -- compares if the current user is the author of the post
				if (foundCamp.author.id.equals(req.user._id)) {
					 next();
				} else {
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
};

// -- AUTHORIZATION -- middleware
//checks if the user logged in is the owner of the element it's trying to modify
middlewareObj.checkCommentOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, foundComment) {
			if (err || !foundComment) {
				req.flash("error","Invalid request");
				res.redirect("back");
			} else {
				// *.equals is a mongoose method to compare ids with same content but different type of data (object and string) -- compares if the current user is the author of the post
				if (foundComment.author.id.equals(req.user._id)) {
					 next();
				} else {
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
};

module.exports = middlewareObj;