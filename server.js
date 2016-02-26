var express = require("express");
var login = require("./login");

express()
	.set("view engine", "ejs")
	.use(express.static("./public"))
	.use(express.static("./bower_components"))
	.use(login.routes)
	.use(require("./chirps"))
	.get("*", function(req, res){
		res.render("index");
	})
	.listen(3000);

console.log("Server is running");