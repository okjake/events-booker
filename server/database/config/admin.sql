BEGIN;

INSERT INTO
    admin(name, email, password)
VALUES
    ('mariam','mariam@gmail.com','$2y$12$PrSt10v/N1cSo8ea5uVDoOtQFOqhYz7dsW5IdwC3cihnmaF2TQ5MG
'),
    ('moh','moh@gmail.com', '$2y$12$1edtV4qo8pzIjL1/o0Nhs.c/Tlrm5b2sFF/IyKpXa.vvFZi0Gte.y');
COMMIT;