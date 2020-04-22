//campgrounds data schema for mongoose
var mongoose = require("mongoose");

var campSchema = new mongoose.Schema({
	name: String,
	image: String,
	location: String,
	description: String,
	price: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref:"User" //the DB model Schema it is referred to
		},
		username: String,
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

var Camp = mongoose.model("Camp", campSchema);
module.exports = Camp;