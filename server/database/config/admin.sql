BEGIN;

INSERT INTO
    admin(name, email, password)
VALUES
    (
        'moh',
        'moh@gmail.com',
        '$2b$10$NFThDzVCJ9G1FPaJ.U7TU..DwMEiaPvkczZ6hWHePLsyrqMcicoWC',
        '$2b$10$oMMY8FbR7QH5vRWLa.a4TO18kGaDTj4hZt2pSdUPl2t.ByfZkoyO6'
    );

COMMIT;

/*
 password = 12345678
 pincode = 12345678
 */