import express from 'express';
import Podlet from '@podium/podlet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import SSR from './ssr';

const port = process.env.PORT || 3002;
const host = process.env.HOST || `http://localhost:${port}`;
const production = process.env.NODE_ENV === 'production';

const app = express();
const podlet = new Podlet({
    name: 'product',
    version: '1.0.0',
    pathname: '/product',
});
podlet.js([
    {value: '/product/static/fragment.js', async: true},
]);

app.use(podlet.middleware());
app.use("/product/static/", express.static("./dist"));
app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
});
app.get(`${podlet.pathname()}/items`, (req, res) => {
    const id = req.query.id ? req.query.id.split(',') : [];
    const mockData = {1: 'apple', 2: 'banana', 3: 'orange'};
    const items = id.map((i) => {
        return {name: mockData[i]};
    });
    ReactDOMServer.renderToNodeStream(
        <div>
            <SSR {...{items: items}}/>
            {!production && <script src={`${host}/product/static/fragment.js`}></script>}
        </div>
    ).pipe(res);
});
app.listen(port);