BEGIN;

INSERT INTO
    users(first_name, last_name, mobile, email, location)
VALUES
    (
        'Ahmed',
        'Safi',
        0567365545,
        'ahmadhsafi1997@gmail.com',
        'Rafah'
    ),
    (
        'Jack',
        'Smith',
        0500000000,
        'jack@gmail.com',
        'Khan'
    ),
    (
        'John',
        'Doe',
        0511111111,
        'john@gmail.com',
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
        '302',
        'CA',
        'lorem ipsum',
        'https://cdn.discordapp.com/attachments/690170174116331638/692532090889306182/control_panel_3.jpg',
        '2038-01-09 03:14:07',
        '120'
    );



COMMIT;