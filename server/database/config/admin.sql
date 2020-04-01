BEGIN;

INSERT INTO
    admin(name, email, password, pin_code)
VALUES
    (
        'Event Booker Admin',
        'events.booker.ca@gmail.com',
        '$2b$10$Amg4gNahYFB9vd3ijSOqOudqH.u4XsCuN3bdcv3raEwo1IMKiXqfW',
        '$2b$10$OTAOgKqnAZnxmk/gDuoMLuXE95tDo.Ne7mzpE4Um0t406Ed07QteG'
    );

/*
 password = admin123
 pin_code = portal123
 */
COMMIT;