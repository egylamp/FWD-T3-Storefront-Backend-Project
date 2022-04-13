CREATE TABLE users(
    id SERIAL PRIMARY  KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(20),
    password VARCHAR(255)
);