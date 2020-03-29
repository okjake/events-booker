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
    user_id INTEGER REFERENCES users(id) ON UPDATE CASCADE,
    event_id INTEGER REFERENCES events(id) ON UPDATE CASCADE,
    user_code INT NOT NULL,
    attendance BOOLEAN DEFAULT false
);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);
INSERT INTO
    events(
        title,
        event_code,
        category,
        details,
        image,
        date,
        duration
    )
VALUES
    (
        'ReactJS',
        302,
        'Code Academy',
        'lorem ipsum',
        'https://i.imgur.com/VgTVTNA.jpg',
        '2038-01-09 03:14:07',
        120
    ),
    (
        'Express',
        303,
        'Code Academy',
        'lorem ipsum',
        'https://i.imgur.com/VgTVTNA.jpg',
        '2020-05-09 15:00:00',
        90
    ),
    (
        'How to Start freelance',
        502,
        'Freelance',
        'lorem ipsum',
        'https://i.imgur.com/VgTVTNA.jpg',
        '2020-06-12 14:30:00',
        180
    );
COMMIT;