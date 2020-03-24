CREATE TABLE Users (
    id          SERIAL           PRIMARY KEY,
    username    character(64)    NOT NULL,
    email       character(64)    NOT NULL,
    password    character(64)    NOT NULL,
    salt        character(64)    NOT NULL
);

CREATE TABLE Directors (
    id      SERIAL PRIMARY KEY,
    name    character(40)
);

CREATE TABLE Movies (
    id          SERIAL PRIMARY KEY,
    title       character(64),
    director_id integer REFERENCES Directors(id)
);

CREATE TABLE Locations (
    id                      SERIAL PRIMARY KEY,
    user_id                 integer REFERENCES Users(id),
    movie_id                integer REFERENCES Movies(id),
    director_id             integer REFERENCES Directors(id),
    location_timestamp      TIMESTAMP NOT NULL,
    return_timestamp        TIMESTAMP
);

INSERT INTO Directors (name) values ('Todd Phillips');
INSERT INTO Directors (name) values ('Sam Mendes');
INSERT INTO Directors (name) values ('Bong Joon Ho');
INSERT INTO Directors (name) values ('Taika Waititi');
INSERT INTO Directors (name) values ('Josh Cooley');
INSERT INTO Directors (name) values ('Brad Bird');

INSERT INTO Movies (title, director_id) VALUES ('Coringa', (SELECT (id) FROM Directors WHERE name ='Todd Phillips'));
INSERT INTO Movies (title, director_id) VALUES ('1917', (SELECT (id) FROM Directors WHERE name ='Sam Mendes'));
INSERT INTO Movies (title, director_id) VALUES ('Parasita', (SELECT (id) FROM Directors WHERE name ='Bong Joon Ho'));
INSERT INTO Movies (title, director_id) VALUES ('Jojo Rabbit', (SELECT (id) FROM Directors WHERE name ='Taika Waititi'));
INSERT INTO Movies (title, director_id) VALUES ('Toy Story 4', (SELECT (id) FROM Directors WHERE name ='Josh Cooley'));
INSERT INTO Movies (title, director_id) VALUES ('George and A.J.', (SELECT (id) FROM Directors WHERE name ='Josh Cooley'));
INSERT INTO Movies (title, director_id) VALUES ('Ratatouille', (SELECT (id) FROM Directors WHERE name ='Brad Bird'));
INSERT INTO Movies (title, director_id) VALUES ('Os Incríveis 2', (SELECT (id) FROM Directors WHERE name ='Brad Bird'));
INSERT INTO Movies (title, director_id) VALUES ('O Ataque do Zezé', (SELECT (id) FROM Directors WHERE name ='Brad Bird'));