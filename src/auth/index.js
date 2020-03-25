import jwt from 'jsonwebtoken';
import * as db from '../database';
import * as utils from '../utils';

export const authUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    let token = extractTokenFromHeader(authHeader);

    if(!token) {
        res.status(401).send('Error, json webtoken required')
    }
    
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        console.log(decodedToken.data+' is doing something');
    } catch(error) {
        res.status(401).send('Invalid token!');
    }

    return next()
}