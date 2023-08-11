import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// import indexRouter from './api/v1/routes';
// import usersRouter from './api/v1/routes/generateUser';

import setUpRoutesV1 from './api/v1/routes';
import cors from 'cors'

const PORT = process.env.PORT || "8090"

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack trace to the console
    res.status(500).send({ error: err.toString() }); // Send error response
});

setUpRoutesV1(app)

app.get('/', (req, res) => {
    res.send("OK")
})

app.listen(PORT, () => {
    console.log(`RUNNINNG ON PORT: ${PORT}`)
})
