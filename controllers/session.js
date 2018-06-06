const db = require('../modle/db.js');
const md5 = require('blueimp-md5')


exports.get = (req,res,next)=>{
	const {user} = req.session
	if(!user)
	{
		return res.status('401').json({
			error:'没有登陆'
		})
	}
	return res.status('200').json(
		user
	)
	
	
}


exports.create = async (req,res,next) =>{
	const body = req.body;
	body.password = md5(md5(body.password));
	const sqlStr = `SELECT * FROM users WHERE email = '${body.email}' and password ='${body.password}' `
	const ret = await db.query(sqlStr)
	
	try{
		if(!ret[0]){
			return res.status(404).json({error:'没有该用户'});
		}
		req.session.user = ret[0];
		res.status(201).json(ret[0]);
		
	}catch(err)
	{
		next(err)
	}
}

exports.destory = (req,res,next) =>{
	if(!req.session.user)
	{
	 return res.status(401).json({});
	}
	delete req.session.user;
	res.status('201').json({});
}