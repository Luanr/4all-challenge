import {validationResult} from 'express-validator';
import * as db from '../database';
import * as utils from '../utils';
import * as jwt from 'jsonwebtoken';

export const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }
    try {
        const email = req.body.email;
        const password = req.body.password;
        const queryResult = (await db.query({
            text: 'SELECT id,username,email,password,salt FROM USERS WHERE email = $1',
            values: [email],
            rowMode: 'array'
        })).rows[0];

        if(!queryResult) {
            res.json('User not found');
        } else {
            const db_salt = queryResult[4];
            const db_hash = queryResult[3];
            if(utils.comparePassword(password,db_hash,db_salt)) {
                const token = jwt.sign({data: email}, process.env.SECRET);
                res.json({message:'Sucess', token: token});
            } else {
                res.json('Wrong password');
            }
        }
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
        const queryResult = await db.query('SELECT (id, username, email) FROM USERS WHERE email = $1 or username = $2', [email, username]);
        console.log(queryResult.rowCount);
        if(queryResult.rowCount) {
            res.json('Error: User or Email already exists!');
        } else {
            const salt = utils.generateSalt();
            const hash = utils.passwordHash(password, salt);
            const registerUser = await db.query('INSERT INTO users (username, email, password, salt) values ($1,$2,$3,$4)', [username, email, hash, salt]);
            res.json('User registered with sucess!');
        }
    } catch(err) {
        res.status(405).json(err);
    }
}