create table user_info (uuid varchar(256) Not null UNIQUE,account varchar(256) Not null UNIQUE,password varchar(256) Not null,token varchar(256) Not null,status integer Not null default 1,foreign key (token) references authtoken(token) on update cascade on delete cascade);