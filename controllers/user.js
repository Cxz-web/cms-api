const md5 = require('blueimp-md5');
const moment = require('moment');
const db = require('../modle/db.js') 
const mysql = require('mysql');





exports.create = async (req,res,next)=>{
	const body = req.body;

	const sqlStr = `
	INSERT INTO users(username,password,email,avatar,gender,nickname,create_time,modify_time)
	VALUES('${body.email._value}',
			   '${md5(md5(body.password._value))}',
			   '${body.email._value}',
		     'default-avatar.png',
					0,
			   '${body.nickname._value}',
			   '${moment().format('YYYY-MM-DD hh:mm:ss')}',
			   '${moment().format('YYYY-MM-DD hh:mm:ss')}')`
	try{
				const rel =  await db.query(sqlStr);
				const user = await db.query(`SELECT * FROM users WHERE  id =${rel.insertId}`)
				res.status(201).json(user[0]);
			
			}catch(err)
			
			{
				next(err);
			}
};


exports.list = async (req,res,next)=>{
	const query = req.query;
	console.log(query);
	try{
			for(var key in query)
				{
					
					const sqlStr = `SELECT * FROM users WHERE ${key}='${query[key]}'`
				
					const [user]= await db.query(sqlStr);
					console.log(user);
					if(user){
						
						return res.status(200).json({error:'用户已经注册'})
						break;
						
					 }
					 
					 res.status(200).json({data:'ok'});
				}
		}catch(err)
		{
			next(err)
		}
		
		
	}
	


