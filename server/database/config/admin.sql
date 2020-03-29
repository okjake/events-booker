BEGIN;

INSERT INTO
    admin(name, email, password)
VALUES
    ('mariam','mariam@gmail.com','$2b$10$7gMjB14U1cWG9UWaZb4nV.UfRLqxIbSDkPXzceRvX0TldBq8uVOWm'),
    ('moh','moh@gmail.com', '$2b$10$NFThDzVCJ9G1FPaJ.U7TU..DwMEiaPvkczZ6hWHePLsyrqMcicoWC');
COMMIT;