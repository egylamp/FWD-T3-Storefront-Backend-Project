CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    fullname VARCHAR(200),
    email VARCHAR(255),
    pass_word VARCHAR(100),
    bio text
);