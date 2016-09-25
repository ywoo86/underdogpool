DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS matchups;
DROP TABLE IF EXISTS picks;

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  alias VARCHAR(3),
  palette VARCHAR(10),
  img_url VARCHAR(255)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255),
  type VARCHAR(10)
);

CREATE TABLE matchups (
  id SERIAL PRIMARY KEY,
  week INTEGER,
  home_id INTEGER REFERENCES teams(id),
  away_id INTEGER REFERENCES teams(id)
);

CREATE TABLE picks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  pick1_id INTEGER REFERENCES matchups(id),
  pick2_id INTEGER REFERENCES matchups(id),
  pick3_id INTEGER REFERENCES matchups(id)
);


