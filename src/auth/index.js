import jwt from 'jsonwebtoken';
import {query} from '../database';

const terminal = {username: 'terminal', password: '123456'};

const auth = (user, password) => {
    
}

export const authUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.status(401).send('Error, json webtoken required')
    }

    return next()
}