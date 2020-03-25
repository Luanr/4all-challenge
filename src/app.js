import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import {query} from './database';
import Dotenv from 'dotenv';

const app = express();
const PORT = 3000;

Dotenv.config();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
routes(app);

const initServer = () => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
};

initServer();