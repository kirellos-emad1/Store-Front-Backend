CREATE TABLE products (
    id serial primary key,
    name varchar (160) unique not null,
    price integer not null
);