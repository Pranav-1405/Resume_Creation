show databases;
create database Resume;
use Resume;

show tables;
describe users;
drop table users;
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from users;

DROP TABLE IF EXISTS resumes;
CREATE TABLE resumes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    education TEXT,
    experience TEXT,
    skills TEXT,
    projects TEXT,
    certifications TEXT,
    languages TEXT,
    linkedin VARCHAR(255),
    github VARCHAR(255),
    achievements TEXT,
    interests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from resumes;