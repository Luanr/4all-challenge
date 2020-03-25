import {body} from 'express-validator';

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
    body('username').not().isEmpty(),
    body('password').not().isEmpty()
];

export const validateLocationReturn = [
    body('username').not().isEmpty(),
    body('password').not().isEmpty()
];

export const validateMovieSearch = [
    body('username').not().isEmpty(),
    body('password').not().isEmpty()
];