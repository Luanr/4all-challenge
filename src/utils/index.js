import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const getUserNameFromAuthorization = (authHeader) => {
    let token = extractTokenFromHeader(authHeader);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return decodedToken.data;
}

export const extractTokenFromHeader = (header) => {
    let authHeader = header;
    if(authHeader.startsWith('Bearer ')) {
        authHeader = authHeader.slice(7, authHeader.length);
    }
    return authHeader;
}

export const generateSalt = () => {
    return crypto.randomBytes(32).toString('hex');
}

export const passwordHash = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256').toString('hex'); 
}

export const comparePassword = (password, hash, salt) => {
    return hash == passwordHash(password, salt); 
}