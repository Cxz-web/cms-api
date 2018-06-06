const pool = mysql.createPool({
	port:3000,
	host:'127.0.0.1',
	db:{
		host:'loclhost',
		user:'root',
		password:'123456',
		database:'cms'
	}
});
