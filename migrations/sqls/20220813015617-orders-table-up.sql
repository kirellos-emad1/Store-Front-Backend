CREATE TABLE orders (
    id serial primary key,
    status varchar(25) not null,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);