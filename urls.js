var fe = require("./controllers/front-end-sec");	
var be = require("./controllers/back-end-sec");

var Urls = function(app){
	app.get("/reflectXss",fe.reflectXss);
	app.get("/storeXss",fe.storeXss);
	app.get("/csrf",fe.csrf);
	app.get("/urlRedirection",fe.urlRedirection);
	app.post("/urlRedirectionPost",fe.urlRedirectionPost);

	app.get("/getOrder" , be.getOrder);
	app.get("/setSystemConfig" , be.setSystemConfig);
	app.get("/ssrfAndrce" , be.ssrfAndrce);
	app.get("/getStatic" , be.getStatic);
}


module.exports = Urls;