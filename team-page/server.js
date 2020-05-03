const express = require('express');
const Layout = require('@podium/layout');
const port = process.env.PORT || 3000;
const teamSearchHost = process.env.TEAM_SEARCH_HOST || 'http://localhost:3003';
const teamProductHost = process.env.TEAM_PRODUCT_HOST || 'http://localhost:3002';

const layout = new Layout({
    name: 'page',
    pathname: '/',
});

const podletSearch = layout.client.register({
    name: 'search',
    uri: `${teamSearchHost}/manifest.json`,
});
const podletProduct = layout.client.register({
    name: 'product',
    uri: `${teamProductHost}/manifest.json`,
});

const app = express();
app.use(layout.middleware());
app.get(`${layout.pathname()}*`, async (req, res) => {
    const incoming = res.locals.podium;

    const [searchBox] = await Promise.all([
        podletSearch.fetch(incoming, {pathname: '/search/box', query: req.query}),
    ]);
    const [items] = await  Promise.all([
       podletProduct.fetch(incoming, {pathname: '/product/items', query: {id: searchBox.headers['x-decide-items']}})
    ]);
    res.podiumSend(`
        <html>
            <head>
                <title>Shop</title>
                ${searchBox.js.map(js => js.toHTML())}
                ${items.js.map(js => js.toHTML())}
            </head>
            <body>
                <div id="app-shell">
                    ${searchBox.content}
                    ${items.content}
                </div>
            </body>
        </html>
    `);
});

app.listen(port);