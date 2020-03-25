import {body, check} from 'express-validator';

export const validateLogin = [
    body('email').isEmail(),
    body('password').not().isEmpty()
];

export const validateUserRegister = [
    body('email').isEmail(),
    body('username').not().isEmpty(),
    body('password').not().isEmpty()
];

export const validateLocationRegister = [
    check('copyid').not().isEmpty()
];

export const validateLocationReturn = [
    check('copyid').not().isEmpty(),
];

export const validateMovieSearch = [
    body('name').not().isEmpty(),
];