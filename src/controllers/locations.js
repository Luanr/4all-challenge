import {validationResult} from 'express-validator';
import * as db from '../database';
import * as utils from '../utils';

export const getLocations = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }
    try {
        res.json('sucess');
    } catch(error) {
        res.status(405).json(error);
    }
};

export const createLocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }
    try {
        const copyId = req.params.id;
        const userMail = utils.getUserNameFromAuthorization(req.headers.authorization);
        const isLocated = (await db.query({
            text: `SELECT * FROM locations WHERE id=$1 and return_date=null`,
            values: [copyId],
            rowMode: 'array'
        })).rows[0];

        if(!isLocated) {
            const insertLocation = (await db.query({
                text: `INSERT INTO locations (user_id, copy_id, location_timestamp) VALUES((SELECT id FROM USERS WHERE EMAIL=$1),$2,NOW())`,
                values: [userEmail,copyId],
                rowMode: 'array'
            })).rows[0];
            res.json('Location with sucess!');
        } else {
            res.json('This copy is already located');
        }
    } catch(error) {
        res.status(405).json(error);
    }
};

export const returnLocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }
    try {
        res.json('sucess');
    } catch(error) {
        res.status(405).json(error);
    }
};