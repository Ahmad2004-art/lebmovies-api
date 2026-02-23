create database lebmovies;

USE  lebmovies;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255) DEFAULT '/Public/images/default.png',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
ALTER TABLE users MODIFY COLUMN profile_image LONGTEXT;

DROP TABLE IF EXISTS users;

SHOW CREATE TABLE users;


DESCRIBE users;

CREATE TABLE movies(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  year INT,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,        
  email VARCHAR(150) NOT NULL UNIQUE,   
  password VARCHAR(255) NOT NULL,      
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);


DROP TABLE IF EXISTS contact_messages;
USE lebmovies;

CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  image_url VARCHAR(255) DEFAULT '/Public/images/contact-default.jpg',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE contact_messages MODIFY COLUMN image_url LONGTEXT;

DESCRIBE contact_messages;

DESCRIBE movies;

select* from users;

select* from admins;

select* from contact_messages;

select* from movies;
show tables;