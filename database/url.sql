USE shortened_db;

CREATE table url (
    id INT AUTO_INCREMENT,
    website TINYTEXT,
    shortened_url VARCHAR(255) UNIQUE,
    PRIMARY KEY(id)
);

