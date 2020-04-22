var mongoose = require ("mongoose");
var passportLocalMongoose = require ("passport-local-mongoose");

var UserSchema = new mongoose.Schema ({
	username: String,
	password: String
});

// adds the authentication methods to the user object so it can open and close the session every time
// a new user logs in or out.
UserSchema.plugin(passportLocalMongoose);

User = mongoose.model ("User", UserSchema);
module.exports = User;