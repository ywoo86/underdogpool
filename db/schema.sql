DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS matchups;
DROP TABLE IF EXISTS picks;

CREATE TABLE teams (
  teams_id SERIAL PRIMARY KEY,
  teams_name VARCHAR(255),
  alias VARCHAR(3),
  img_url VARCHAR(255),
  palette VARCHAR(10)
);

CREATE TABLE users (
  users_id SERIAL PRIMARY KEY,
  users_name VARCHAR(50),
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255),
  type VARCHAR(10),
  points INTEGER
);

CREATE TABLE matchups (
  matchups_id SERIAL PRIMARY KEY,
  week INTEGER,
  home_id INTEGER REFERENCES teams(teams_id),
  away_id INTEGER REFERENCES teams(teams_id),
  underdog INTEGER,
  underdog_win BOOLEAN,
  gameover BOOLEAN
);

CREATE TABLE picks (
  id SERIAL PRIMARY KEY,
  picks_user_id INTEGER REFERENCES users(users_id),
  game_picked_id INTEGER REFERENCES matchups(matchups_id),
  team_picked_id INTEGER REFERENCES teams(teams_id)
);


