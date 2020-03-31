BEGIN;

DROP TABLE IF EXISTS users,
events,
user_event,
admin CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    event_code INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    details TEXT NOT NULL,
    image TEXT NOT NULL,
    date TIMESTAMP,
    duration INT,
    expired BOOLEAN DEFAULT false
);

CREATE TABLE user_event (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    event_id INTEGER REFERENCES events(id),
    user_code INT NOT NULL,
    attendance BOOLEAN DEFAULT false
);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    pin_code VARCHAR(200) NOT NULL
);

COMMIT;