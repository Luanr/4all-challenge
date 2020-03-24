import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import {query} from './database';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
routes(app);

const initServer = () => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
};

const run = async () => {
    try {
        let result = await query('SELECT NOW()');
        console.log(result.rows);
    } catch(err) {
        console.log(err);
    }
}

initServer();
run();