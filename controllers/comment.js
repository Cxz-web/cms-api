const  db = require('../modle/db.js')

exports.create = async (req,res,next) =>{
	
	const {commentContent,article_id} = req.body;
	
	console.log(req.session.user.id);
	const sqlStr = `INSERT INTO comments(content,create_time,modify_time,article_id,user_id)
				    VALUES('${commentContent}','${Date.now()}','${Date.now()}','${article_id}','${req.session.user.id}')`
	try{
		const {insertId}= await db.query(sqlStr);
		
		const [comment]=await db.query(`SELECT * FROM comments WHERE id= ${insertId}`);
		res.status(201).json(comment);
		
	}catch(err)
	{
		next(err);
	}
	 
	
};


exports.list = async (req,res,next)=>{
	console.log(req.query);
	try{
		const {article_id} = req.query;
		const sqlStr = `SELECT * FROM comments WHERE article_id = ${article_id}`;
		const comments =  await db.query(sqlStr);
		res.status(200).json(comments)
	}catch(err){
		next(err);
	}
}

