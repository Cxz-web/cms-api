const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router.js');
const session = require('express-session');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(session({
	secret:'itcast',
	resave:false,
	saveUninitialized:false
}));



app.use(router);

app.use((err,req,res,next)=>{
	
	res.status(500).json({
		error:err.message
	})
	
})

app.listen('3000',function(){
	console.log('服务器开启')
	
});



