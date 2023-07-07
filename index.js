const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');

require('./config/mongoose');

const app = express();
const port = 3000;

// set template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' })); // extname: '.hbs'，是指定副檔名為 .hbs，有了這行以後，我們才能把預設的長檔名改寫成短檔名
app.set('view engine', 'hbs');
app.use(express.static('public'));

// set session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// setting body-parser
app.use(express.urlencoded({ extended: true }));

// setting routes
app.use(routes);

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
