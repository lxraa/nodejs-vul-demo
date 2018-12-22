const fs = require("fs");

var FeSec = {
	/*
		1、反射型xss
	*/
	reflectXss : function(req,res){

		res.send(req.query.input);
	},

	/*
		2、存储型xss
	*/
	storeXss : function(req,res){
		/*
			展示数据库中的数据
		*/
		var responseText = (function getData(){
			return fs.readFileSync("./models/data.txt",function(){});
		})();

		fs.writeFileSync("./models/data.txt",req.query.input+"<br>",{"flag":"a"});
		res.append("Content-Type","text/html");
		res.send(responseText);

	},
	/*
		3、跨站请求伪造
	*/
	csrf : function(req,res){
		//身份认证
		if(req.cookies.auth == "true"){
			fs.writeFileSync("./models/csrf.txt",req.query.input);
			res.send("Authorized , Do Something")
		}
		else{
			res.send("unauthorized")
		}
	},
	/*
		4、url 跳转
	*/
	urlRedirection : function(req,res){
		//验证用户名密码，若验证通过，带token跳转到指定的target
		if(req.query.user == "user" && req.query.password == "password"){
			res.send(`
				Jumping...
				<script>
				var url = new URL(location.href);
				var target = url.searchParams.get("target");
				var form = document.createElement("form");
				form.action = target;
				form.style.display = "none";
				form.method = "POST";

				params = {
					ssoid : "B928B0C5B24EADE89D839217CA7943E1"
				}

				for (var x in params) {
					var opt = document.createElement("textarea");
					opt.name = x;
					opt.value = params[x];
					form.appendChild(opt);
				}
				document.body.appendChild(form);
				form.submit();

				</script>`)
		}
		else{
			res.send("sso login page");
		}
	},
	urlRedirectionPost : function(req,res){

		res.send(req.body.ssoid);
	}


} 


module.exports = FeSec;