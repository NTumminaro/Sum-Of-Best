DROP DATABASE IF EXISTS project_db;
CREATE DATABASE project_db;

USE project_db;

CREATE TABLE users (
  userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  screen_name VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE login_archive (
  loginid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userid INT NOT NULL,
  last_login DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
  CONSTRAINT FK_USERID-LOGINID FOREIGN KEY (userid) REFERENCES users(userid)
    ON DELETE CASCADE
);

CREATE TABLE games (
    gameid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL,
    release_year INT,
    console_type VARCHAR(255),
    image_url VARCHAR(255),
    discord_url VARCHAR(255),
    notes VARCHAR(255)
    );

INSERT INTO users (screen_name, user_password)
VALUES
    ( "sal", "password12345"),
    ( "lernantino", "password12345"),
    ( "amiko2k20", "password12345");

INSERT INTO games (game_name, release_year, console_type, image_url, discord_url, notes)
VALUES
    ( "Diablo 2", 2021, "PC", "https://blz-contentstack-images.akamaized.net/v3/assets/blt45749e0fed8aa592/blte66a3fe9f4e3ea89/6062202df31b360cc84def07/diablo2-logo-lg.png?format=webply&quality=90", null, "This game is AWESOME!!!"),
    ( "Counter Strike", 2000,"PC", "https://gametrex.com/wp-content/uploads/2019/02/Counter-Strike-1.6-Free-Download.jpg", null, "All nighter worthy"),
    ( "Final Fantasy 7: Remake", 2015,"PS5", "https://vulcan.dl.playstation.net/img/cfn/113075PxnarzRek4cRpjrRWSpLfrcBd23B5e_Yj2azms6nWYKmySv4h3a22G5_R1CM4BQUmSRD6oOArDROKv041NUkgun78-.png", null, "Still deciding");