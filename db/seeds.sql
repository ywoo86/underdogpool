COPY teams (teams_name, alias, img_url, palette) FROM '/Users/youngwoo/Desktop/underdogpool/db/teams.csv' DELIMITER ',' CSV;
COPY matchups (week, home_id, away_id, underdog, underdog_win, gameover) FROM '/Users/youngwoo/Desktop/underdogpool/db/matchups.csv' DELIMITER ',' CSV;
