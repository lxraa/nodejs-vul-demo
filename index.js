const express = require("express");
const body_parser = require("body-parser");
const cookie_parser = require("cookie-parser");
const urls = require("./urls");


var app = express();
app.use(body_parser.urlencoded({extended:false}));
app.use(cookie_parser());

urls(app);

app.listen(3000,function(){
	console.log("[*] listening port 3000")
});