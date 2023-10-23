CREATE TABLE order_products (
    id serial primary key,
    quantity integer not null,
    order_id integer REFERENCES orders(id) ON DELETE CASCADE,
    product_id integer REFERENCES products(id),
    unique (order_id, product_id)
);