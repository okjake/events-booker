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
        'Code Academy',
        'lorem ipsum',
        'https://i.imgur.com/VgTVTNA.jpg',
        '2038-01-09 03:14:07',
        120
    );

INSERT INTO
    user_event(user_id, event_id, user_code)
VALUES
(1, 1, 200);

COMMIT;