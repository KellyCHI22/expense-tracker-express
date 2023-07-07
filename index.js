// app.js
// include packages and define server related variables
const express = require('express');
const exphbs = require('express-handlebars');

// require mongoose
require('./config/mongoose');

const app = express();
const port = 3000;

// setting template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' })); // extname: '.hbs'，是指定副檔名為 .hbs，有了這行以後，我們才能把預設的長檔名改寫成短檔名
app.set('view engine', 'hbs');

// setting body-parser
app.use(express.urlencoded({ extended: true }));

// setting routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  res.render('index');
});

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
