USE unidb;

CREATE TABLE classroom (
building varchar(10),
room_number VARCHAR(10),
capacity int,
PRIMARY KEY (building, room_number)
);

CREATE TABLE department (
    dept_name VARCHAR(20),
    building VARCHAR(15),
    budget NUMERIC(12,2),
    PRIMARY KEY (dept_name)
);

CREATE TABLE course (
    course_id VARCHAR(8),
    title VARCHAR(50),
    dept_name VARCHAR(20),
    credits NUMERIC(2,0),
    PRIMARY KEY (course_id),
    FOREIGN KEY (dept_name) REFERENCES department(dept_name)
);

CREATE TABLE instructor(
ID VARCHAR(10),
name varchar(20),
dept_name VARCHAR(20),
salary INT,
PRIMARY KEY (ID),
foreign key (dept_name) REFERENCES department(dept_name)
);

CREATE TABLE section (
course_id VARCHAR(8),
sec_id VARCHAR(8),
semester INT,
year INT,
building VARCHAR(15),
room_number VARCHAR(10),
time_slot_id VARCHAR(10),
PRIMARY KEY (course_id, sec_id, semester, year),
FOREIGN KEY(course_id) references course(course_id),
FOREIGN KEY(building,room_number) references classroom(building, room_number)
);

CREATE TABLE teaches (
    ID VARCHAR(5),
    course_id VARCHAR(8),
    sec_id VARCHAR(8),
    semester int,
    year int,
    PRIMARY KEY (ID, course_id, sec_id, semester, year),
    FOREIGN KEY (ID) REFERENCES instructor(ID),
    FOREIGN KEY (course_id, sec_id, semester, year) REFERENCES section(course_id, sec_id, semester, year)
);

CREATE TABLE student (
ID INT PRIMARY KEY,
name VARCHAR(60),
dept_name VARCHAR(20),
total_creds INT,
FOREIGN KEY (dept_name) REFERENCES department(dept_name)
);

CREATE TABLE takes (
ID VARCHAR(10),
course_id VARCHAR(8),
sec_id VARCHAR(8),
semester int,
year int,
grade VARCHAR(2),
PRIMARY KEY (ID, course_id, sec_id, semester, year),
FOREIGN KEY(ID) REFERENCES student(ID),
FOREIGN KEY (course_id, sec_id, semester, year) REFERENCES
section(course_id, sec_id, semester, year)
);

CREATE TABLE advisor(
s_ID varchar(5),
i_ID varchar(5),
PRIMARY KEY (s_ID),
foreign key(i_ID) REFERENCES instructor(ID),
foreign key(s_ID) REFERENCES student(ID)
);

CREATE TABLE time_slot (
time_slot_id VARCHAR(10),
day VARCHAR(5),
start_time TIME,
end_time TIME,
PRIMARY KEY (time_slot_id, day, start_time)
);

CREATE TABLE prereq (
course_id VARCHAR(8),
prereq_id VARCHAR(8),
PRIMARY KEY(course_id, prereq_id),
FOREIGN KEY(course_id) REFERENCES course(course_id),
FOREIGN KEY (prereq_id) REFERENCES course(course_id)
);


-- Making tables for management

CREATE TABLE users (
user_id VARCHAR(10) PRIMARY KEY ,
username VARCHAR(50) unique NOT NULL,
password VARCHAR(60) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
role_type ENUM('instructor','student', 'advisor', 'admin')
 NOT NULL,
 role_id VARCHAR(10)
 );
 
 DROP TABLE users; 
 



