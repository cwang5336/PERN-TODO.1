CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);


-- export PATH="/Applications/Postgres.app/Contents/Versions/14/bin:$PATH"
-- psql -U postgres