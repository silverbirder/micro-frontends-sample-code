import sirv from 'sirv';
import compression from 'compression';
import express from 'express';
import * as sapper from '@sapper/server';

const Podlet = require('@podium/podlet');
const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';

const podlet = new Podlet({
    name: 'checkout',
    version: '1.0.0',
    pathname: '/',
});

const app = express();

app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
});

app.use(podlet.middleware());
app.use(sirv('static', { dev }));
app.use(compression({threshold: 0}));
app.use(sapper.middleware());

app.get('/basket', (req, res, next) => {
    console.log(res.get('Link'));
    next();
});

app.listen(PORT, err => {
    if (err) console.log('error', err);
});
