CREATE TABLE characters (
  ID SERIAL PRIMARY KEY,
  charName VARCHAR(255) NOT NULL,
  charClass VARCHAR(255) NOT NULL
);

INSERT INTO characters (charName, charClass)
VALUES  ('Bob', 'Fighter');