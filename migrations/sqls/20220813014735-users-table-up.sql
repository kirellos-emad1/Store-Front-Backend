create table users (
  id serial primary key,
  email varchar (255) not null unique,
  firstName varchar(100) not null,
  lastName varchar(100)  not null,
  hashpwd varchar(255) not null
  );