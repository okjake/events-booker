BEGIN;

INSERT INTO
    admin(name,img, email, password, pin_code)
VALUES
    (
        'Event Booker Admin',
        'https://lh3.googleusercontent.com/proxy/VF-0IZFcLimPQZiB6lJbwo-5t2mUf5emwAI9M1Y6sz3NF3VvPYqwuV9OrAbGNvjC52Sbq98UJ7xoX1qN-Hknv36LhIi2n0EwPQ-SWTgzmz4j5-2j98IV9g',
        'events.booker.ca@gmail.com',
        '$2b$10$Amg4gNahYFB9vd3ijSOqOudqH.u4XsCuN3bdcv3raEwo1IMKiXqfW',
        '$2b$10$OTAOgKqnAZnxmk/gDuoMLuXE95tDo.Ne7mzpE4Um0t406Ed07QteG'
    );

/*
 password = admin123
 pin_code = portal123
 */
COMMIT;