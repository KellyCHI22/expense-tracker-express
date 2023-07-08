const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const methodOverride = require('method-override');
const routes = require('./routes');
const usePassport = require('./config/passport');

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

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

usePassport(app);

// add some local vars
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

// setting routes
app.use(routes);

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
