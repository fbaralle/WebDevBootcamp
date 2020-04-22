var mongoose = require("mongoose");

//User schema (email, name). Define each item of the database
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	]
});

// Define the collection of the database and export the model 
module.exports = mongoose.model("User", userSchema);