import {validationResult} from 'express-validator';
import * as db from '../database';
import * as utils from '../utils';

export const createLocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }
    
    try {
        const copyId = req.params.copyid;
        const userEmail = utils.getUserNameFromAuthorization(req.headers.authorization);
        const isLocated = (await db.query({
            text: `SELECT * FROM locations WHERE copy_id=$1 and return_timestamp IS NULL`,
            values: [copyId],
            rowMode: 'array'
        })).rowCount;

        if(!isLocated) {
            const insertLocation = (await db.query({
                text: `INSERT INTO locations (user_id, copy_id, location_timestamp) VALUES((SELECT id FROM USERS WHERE EMAIL=$1),$2,NOW())`,
                values: [userEmail,copyId],
                rowMode: 'array'
            }));
            res.json('Location with sucess!');
        } else {
            res.json('This copy is already located');
        }
    } catch(error) {
        console.log(error);
        res.status(405).json(error);
    }
};

export const returnLocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }
    
    try {
        const copyId = req.params.copyid;
        const canReturned = (await db.query({
            text: `SELECT * FROM locations WHERE copy_id=$1 and return_timestamp IS NULL`,
            values: [copyId],
            rowMode: 'array'
        })).rowCount;

        if(canReturned) {
            const insertLocation = (await db.query({
                text: `UPDATE locations SET return_timestamp = NOW() WHERE copy_id = $1`,
                values: [copyId],
                rowMode: 'array'
            }));
            res.json('Location return with sucess!');
        } else {
            res.json('This copy was not located or it is already returned.');
        }
    } catch(error) {
        res.status(405).json(error);
    }
};