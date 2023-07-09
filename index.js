const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const routes = require('./routes');
const usePassport = require('./config/passport');

require('./config/mongoose');

const app = express();
const PORT = process.env.PORT || 3030;

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
app.use(flash());

// add some local vars
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  res.locals.danger_msg = req.flash('danger_msg');
  next();
});

// setting routes
app.use(routes);

// starts the express server and listening for connections.
app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`);
});
