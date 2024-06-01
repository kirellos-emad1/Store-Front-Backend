CREATE TABLE products (
    id serial primary key,
    name varchar (160) not null,
    price integer not null,
    quantity integer not null,
    description TEXT,
    images TEXT[],
    category varchar(160),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);