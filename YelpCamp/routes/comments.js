var express = require ("express"),
	router = express.Router({mergeParams: true}), //pass through data from the url (/:id)
	Camp = require ("../models/campgrounds"),
	Comment = require ("../models/comments"),
	middleware = require("../middleware"); //looks for "index.js" bu default


// COMMENTS ROUTES -------
// New comments form
router.get("/new", middleware.isLoggedIn, function (req, res) {
	Camp.findById(req.params.id, function(err, foundCamp) {
		if (err) {
			console.log(err);
		} else {
			
			res.render("comments/new", {campground: foundCamp}); 
		}
	})
});

// New comments post request
router.post("/", middleware.isLoggedIn, function (req, res) {
	Camp.findById(req.params.id, function (err, foundCamp) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					req.flash("error","Something went wrong, try again");
					console.log(err);
				} else {
					// saves current username and id in the "author" attribute of the comment generated
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					foundCamp.comments.push(comment);
					foundCamp.save();
					req.flash("success","You commented this post, thanks for the feedback");
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}
	});
});

// EDIT comment form route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id, function (err, foundComment) {
		if (err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {comment: foundComment, campground_id: req.params.id})
		}
	});
});

// UPDATE comment route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
		if (err) {
			res.redirect("back");
		} else {
			req.flash("success","Your comment was updated");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


// DELETE comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function (err, deletedComment) {
		if (err) {
			res.redirect("back");
		} else {
			req.flash("info","Your comment was deleted");
			res.redirect ("/campgrounds/" + req.params.id);
		}
	});
});



module.exports = router;