const fs = require("fs");
const c = require("child_process")

var BeSec = {

	

	/*
		5、水平越权
		
	*/
	getOrder : function(req,res){
		if(req.cookies.user){
			var data = {
				1:{user:"user1",data:"order1"},
				2:{user:"user2",data:"order2"},
				3:{user:"user3",data:"order3"}
			}
			res.send(data[req.query.orderId].data);
		}
		else{
			res.send("unauthorized");
		}

	},
	/*
		6、垂直越权
	*/
	setSystemConfig : function(req,res){
		if(new Buffer(req.cookies.whoami, 'base64').toString() == "admin" && req.cookies.user){
			res.send("[*] you are admin");
		}
		else{
			res.send("[!] you are not admin")
		}
	},

	ssrfAndrce : function(req,res){
		var cmd = `curl ${req.query.url}`;
		console.log(cmd);
		c.exec(cmd,function(err,stdout,stdin){
			res.send(stdout);
		});
	},

	getStatic : function(req,res){
		var static_path = "/../static/"
		var r = fs.readFileSync(__dirname+static_path+req.query.file,function(){});
		res.append("Content-Type","text/javascript");
		res.send(r);
	},

	sqli : function(req,res){
		let sql = "select * from `common` where id="+req.query.id;

		res.send("ok");
	}
}

module.exports = BeSec;




