import {validationResult} from 'express-validator';
import * as db from '../database';

export const login = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }
    try {
        res.json('sucess');
    } catch(error) {
        res.status(405).json(error);
    }
}

export const logout = (req, res, next) => {
    try {
        res.json('sucess');
    } catch(error) {
        res.status(405).json(error);
    }
}

export const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }
    try {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const queryResult = await db.query('SELECT (id, username, email) FROM USERS WHERE email = $1 or username = $2', [username, password]);
        if(queryResult.rowCount) {
            res.json('Error: User or Email already exists!');
        } else {

            const createUser = await db.query();
            res.json('Sucess');
        }
    } catch(err) {
        res.status(405).json(err);
    }
}