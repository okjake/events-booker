BEGIN;

INSERT INTO
    users(first_name, last_name, mobile, email, location)
VALUES
    (
        'Ahmed',
        'Safi',
        '0567365545',
        'ahmadhsafi1997@gmail.com',
        'Rafah'
    ),
    (
        'Jack',
        'Smith',
        '0500000000',
        'jack@gmail.com',
        'Khan'
    ),
    (
        'John',
        'Doe',
        '0511111111',
        'john@gmail.com',
        'Gaza'
    ),
    (
        'Oyama',
        'Kun',
        '0522222222',
        'kun@hotmail.com',
        'Gaza'
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
        'CodeAcademy',
        'lorem ipsum',
        'https://i.imgur.com/VgTVTNA.jpg',
        '2038-01-09 03:14:07',
        120
    ),
    (
        'Express',
        303,
        'CodeAcademy',
        'lorem ipsum',
        'https://i.imgur.com/VgTVTNA.jpg',
        '2020-05-09 15:00:00',
        90
    ),
    (
        'NodeJs',
        304,
        'Code Academy',
        'lorem ipsum',
        'https://i.imgur.com/DWiWJE7.jpg',
        '2022-05-09 15:00:00',
        100
    ),
    (
        'Database whatever',
        305,
        'Code Academy',
        'lorem ipsum',
        'https://i.imgur.com/VgTVTNA.jpg',
        '2020-05-09 15:00:00',
        90
    ),
    (
        'How to Start freelance',
        306,
        'Freelance',
        'lorem ipsum',
        'https://i.imgur.com/DWiWJE7.jpg',
        '2020-06-12 14:30:00',
        180
    ),
     (
        'How to work as freelancer',
        307,
        'Freelance',
        'lorem ipsum',
        'https://i.imgur.com/DWiWJE7.jpg',
        '2020-06-12 14:30:00',
        20
    );

INSERT INTO
    user_event(user_id, event_id, user_code)
VALUES
    (1, 1, 200),
    (1, 3, 202),
    (4, 1, 500),
    (2, 1, 999);

COMMIT;