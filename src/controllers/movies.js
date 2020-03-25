import {validationResult} from 'express-validator';
import * as db from '../database';

export const getAvailableMovies = async (req, res) => {
    try {
        const queryResult = (await db.query({
            text: `SELECT copies.id, movies.title, directors.name FROM movies INNER JOIN directors
            ON movies.director_id = directors.id INNER JOIN copies
            ON copies.movie_id = movies.id LEFT JOIN locations
            ON locations.return_timestamp IS NULL`,
            rowMode: 'array'
        }));
        res.json(queryResult.rows);
    } catch(error) {
        res.status(405).json(error);
    }
};

export const getMovie = async (req, res) => {
    const errors = validationResult(req);
    const movieName = req.params.title;
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }
    try {
        const queryResult = (await db.query({
            text: `SELECT id, title, name FROM (
                        SELECT movies.title, movies.director_id
                        FROM movies
                        WHERE movies.title LIKE $1) AS movies
                  INNER JOIN directors ON movies.director_id = directors.id`,
            values: ['%'+movieName+'%'],
            rowMode: 'array'
        }));
        res.json(queryResult.rows);
    } catch(error) {
        res.status(405).json(error);
    }
};