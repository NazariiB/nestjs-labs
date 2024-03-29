drop table if exists `message`
drop table if exists device
drop table if exists safe_area
drop table if exists user
create table user ( id int auto_increment primary key,  name varchar(20),  email varchar(30),  password varchar(20),  role varchar(10),  phoneNumber varchar(15))
create table safe_area( id int auto_increment primary key,  user_id int,  name varchar(20),  is_working boolean, foreign key (user_id) references user(id) on delete cascade)
create table device ( id int auto_increment primary key,  area_id int,  status varchar(10),  date date,  model varchar(20),  location varchar(100), foreign key (area_id) references safe_area(id) on delete cascade)
create table message ( id int auto_increment primary key,  data varchar(100),  date timestamp default NOW(),  type varchar(20),  device_id int, foreign key (device_id) references device(id) on delete cascade)