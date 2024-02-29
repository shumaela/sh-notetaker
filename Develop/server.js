const express = require('express');
const api_routes = require('./routes/api-routes')
const html_routes = require('./routes/html-routes')
const PORT = process.env.PORT || 3001;
const path = require('path')
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(api_routes)
app.use(html_routes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});