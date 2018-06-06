CREATE DATABASE IF NOT EXISTS cms;
use cms;
CREATE TABLE USERS(
      id INT PRIMARY KEY auto_increment,
	  username VARCHAR(50) NOT NULL,
	  password VARCHAR(50) NOT NULL,
	  email VARCHAR(50) NOT NULL,
	  avatat VARCHAR(100) NULL,
	  gender BIT NULL,
	  create_time DATETIME NOT NULL,
	  modify_time DATETIME NOT NULL,
		nickname VARCHAR(50) NOT NULL
);


CREATE TABLE topics(
		id INT PRIMARY KEY auto_increment,
		title VARCHAR(100) NOT NULL,
		content TEXT NOT NULL,
		create_time DATETIME NOT NULL,
		user_id INT NOT NULL,
		modify_time DATETIME NOT NULL
		
		
);

CREATE TABLE comments(
	id INT PRIMARY KEY auto_increment,
	content TEXT NOT NULL,
	create_time BIGINT NOT NULL,
	article_id INT NOT NULL,
	user_id INT NOT NULL,
	reply_id INT NULL,
	modify_time BIGINT NOT NULL
	

);