const express = require('express');
const router = express.Router();
const userController = require('./controllers/user.js');
const sessionController = require('./controllers/session.js');
const topicController = require('./controllers/topic.js');
const db = require('./modle/db.js')
const commentController = require('./controllers/comment.js')

const checkLogin = (req,res,next) =>{
     const {user} = req.session;
	 if(!user)
	 {
		 return res.status(500).json({error:'没有登陆'});
	 }
	 next();
	
};

const checkTopic = async (req,res,next)=>{
		
		const {id} = req.params;
		const sqlStr = `DELETE FROM topics WHERE id='${id}'`;
		try{
			const [topic]= await db.query(`SELECT * FROM topics WHERE id= ${id}`);
			
			if(!topic)
			{
				return res.status(404).json({error:'话题不存在'});
			}
			if(topic.user_id!==req.session.user.id)
			{
				return res.status(400).json({error:'用户没有权限'});
			}
			
			next();
			
		}catch(error){
			next(error)
			
		}
}




router.get('/session',sessionController.get)
	    .delete('/session',sessionController.destory)
      .post('/session',sessionController.create)


router.post('/users',userController.create)
      .get('/users',userController.list)

router.post('/topic',checkLogin,topicController.create)
      .get('/topics/:id',topicController.one)
			.get('/topic',topicController.list)
			.delete('/topic/:id',checkLogin,checkTopic,topicController.destory)
			.patch('/topic/:id',checkLogin,checkTopic,topicController.update)

			
router.post('/comments',checkLogin,commentController.create)		
      .get('/comments',commentController.list)
			
module.exports = router;