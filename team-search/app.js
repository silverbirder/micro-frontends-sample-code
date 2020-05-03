const path = require('path');
const fs = require('fs');
const express = require('express');
const serialize = require('serialize-javascript');
const Podlet = require('@podium/podlet');
const VueServerRenderer = require('vue-server-renderer');

const port = process.env.PORT || 3003;
const template = fs.readFileSync(path.join(__dirname, 'src/index.template.html'), 'utf-8');
const renderer = VueServerRenderer.createBundleRenderer(path.join(__dirname, 'dist/vue-ssr-server-bundle.json'), {template});

const app = express();
const podlet = new Podlet({
    name: 'search',
    version: '1.0.0',
    pathname: '/search',
});
podlet.js([
    {value: '/search/static/fragment.js', async: true, defer: true},
]);

app.use(podlet.middleware());
app.use('/search/static/', express.static('dist'));
app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
});
app.get(`${podlet.pathname()}/*`, (req, res) => {
    const ctx = {url: req.url};
    renderer.renderToString(ctx, async (err, html) => {
        if (err) {
            console.log(err);
            return res.status(500).end('Interval Server Error');
        }
        const id = ctx.initialState.productItems.map(item => {
           return item.id;
        }).join(',');
        res.set('X-DECIDE-ITEMS', id);
        html += `<script>window.__INITIAL_STATE__=${serialize(ctx.initialState, {isJSON: true})}</script>`;
        res.end(html);
    });
});

app.listen(port);