
var mongoose = require("mongoose");
var Post = require("./models/post");
var User = require("./models/user");

//App CONFIG packages (database, view engine, body parser and stylesheet route)
mongoose.connect("mongodb://localhost:27017/blog-app-demo2", {useNewUrlParser: true, useUnifiedTopology: true});



Post.create({
	title: "how to make the best drinks for your meals",
	content: "you will need some ice, fruits, and jaggermeister. And obviously, two glasses"
}, function (err, post){
	User.findOne({email:"pedrito@gmail.com"}, function (err, foundUser) {
		if (err) {
			console.log(err);
		} else {
			foundUser.posts.push(post);
			foundUser.save(function(err, data) {
				if (err) {
					console.log(err);
				} else {
					console.log(data);
				}
			});
		}
	});
});

// User.create({
// 	email: "pedrito@gmail.com",
// 	name: "Pedro Winter"
// });

// find one user with email, then chain the posts field with the objects referred to its Ids array, and then exec starts the query
// User.findOne({email:"pedrito@gmail.com"}).populate("posts").exec(function(err, user){
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });
