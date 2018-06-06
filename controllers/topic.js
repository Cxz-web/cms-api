const db = require('../modle/db.js');
const moment = require('moment');


exports.list = async (req,res,next) =>{
  
	let {_page=1,_limit=20} = req.query;
	_page = parseInt(_page);
	_limit = parseInt(_limit);
	
	if(_page<1)
	{
		_page = 1;
	}
	if(_limit<1)
	{
		_limit=1;
	}
	if(_limit>20)
	{
		_limit=20
	}
	const start = (_page-1)*_limit;
	try{
		const [{count}] = await db.query(`SELECT COUNT(*) as count FROM topics`);
		const sqlStr = `select * FROM topics order by id desc LIMIT ${start},${_limit}`;
		const topics = await db.query(sqlStr);
		res.status(200).json({topics,count});
		
	
	}catch(err){
		next(err);
	}
}

exports.one = async (req,res,next) =>{
	 console.log(1);
	 const {id} = req.params;
	 console.log(id);
	 const sqlStr = `SELECT * FROM topics WHERE id=${id}`
	 try{
		 const rel= await db.query(sqlStr);
		 res.status(200).json(rel);
	 }catch(error)
	 {
		 next(error);
	 } 
	
}



exports.destory = async (req,res,next) =>{
   
	const {id} = req.params;
	const sqlStr = `DELETE FROM topics WHERE id=${id}`;
	try{
		await db.query(sqlStr);
		res.status(201).json({});
	}
	catch(error)
	{
	  next(error)	
	}
	
	
}


exports.update = async (req,res,next) => {
	const {id} = req.params;
	const body = req.body;
	const sqlStr = `UPDATE topics SET title='${body.title}',content='${body.content}',
	modify_time = '${moment().format('YYYY-MM-DD hh:mm:ss')}' WHERE id='${id}'`
	console.log(sqlStr)
	try{
		await db.query(sqlStr);
		
	    const [updateTopic] = await db.query(`SELECT * FROM topics WHERE id = ${id}`);  
		res.status(201).json(updateTopic);
		
	}catch(err){
		next(err)
	}
	
};


exports.create = async (req,res,next)=>{
	const {user} = req.session;
	
	const body =req.body;

	body.user_id = user.id;
	const strSql = `INSERT INTO topics (title,content,create_time,user_id,modify_time)
	VALUES('${body.title}','${body.content}','${moment().format('YYYY-MM-DD hh:mm:ss')}','${body.user_id}','${moment().format('YYYY-MM-DD hh:mm:ss')}')`
	
	try{
	    const ret= await db.query(strSql);
		console.log(ret);
		const [topic] = await db.query(`SELECT * FROM topics WHERE id = ${ret.insertId}`)
		res.status(201.).json(topic)  
		
	}catch(error){
		
		next(error);
	}
};