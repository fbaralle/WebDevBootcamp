var request = require("request");

//	eval(require("locus")); freezes code and returns data

request("https://jsonplaceholder.typicode.com/users/1", function (error, response, body) {

	if (!error && response.statusCode == 200) {
		var parsedData = JSON.parse(body);
		console.log("It works fine..");
		console.log("The user selected is;");
		console.log("Name: " + parsedData.name + ";\nusername: " + parsedData.username + ";\nemail: " + parsedData.email);
		
	}
});