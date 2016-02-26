var express = require("express");

express()
	.set("view engine", "ejs")
	.use(express.static("./public"))
	.use(express.static("./bower_components"))
	.get("*", function(req, res){
		res.render("index");
	})
	.listen(3000);

console.log("Server is running");