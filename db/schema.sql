DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS users;

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  alias VARCHAR(3),
  img_url VARCHAR(255),
  palette VARCHAR(10)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255),
  team_id INTEGER REFERENCES teams(id),
  admin BOOLEAN
);


