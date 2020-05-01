const express = require('express');
const Layout = require('@podium/layout');
const port = process.env.PORT || 3000;
const teamSearchHost = process.env.TEAM_SEARCH_HOST || 'http://localhost:3003';

const layout = new Layout({
    name: 'page',
    pathname: '/',
});

const podletSearch = layout.client.register({
    name: 'search',
    uri: `${teamSearchHost}/manifest.json`,
});

const app = express();
app.use(layout.middleware());
app.use('/static/', express.static('dist'));
app.get(`${layout.pathname()}*`, async (req, res) => {
    const incoming = res.locals.podium;

    const [searchBox] = await Promise.all([
        podletSearch.fetch(incoming, {pathname: '/search/box', query: req.query}),
    ]);
    res.podiumSend(`
        <html>
            <head>
                <title>Shop</title>
                <script src="/static/fragment.js"></script>
            </head>
            <body>
                <div id="app-shell">
                    ${searchBox.content}
                </div>
            </body>
        </html>
    `);
});

app.listen(port);