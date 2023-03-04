// MODULES
const express = require('express');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const loginRoute = require('./routes/loginRoute');
const homeRoute = require('./routes/homeRoute');
const userRoute = require('./routes/userRoute');

const helpers = require('./utils/helpers');

// INITIALIZE
const app = express();
const store = new session.MemoryStore();

// MIDDLEWARE
// Show request method if run in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Handlebars config
app.engine('hbs', hbs.engine({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers, 
}));
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

// Static files
app.use(express.static(`${__dirname}/public`))

// Body parser to read as Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Telling middleware what string to look when do a request method
app.use(methodOverride('_method'));

// Session config
app.use(session({
  secret: 'some secret',
  cookie: { maxAge: null },
  saveUninitialized: false,
  resave: false,
  store,
}));

// Flash config
app.use(flash());

// Always run when having a new request
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  // console.log(res.locals.message);
  next();
});

// ROUTES
app.use('/:var(home)?', homeRoute);
app.use('/login', loginRoute);
app.use('/user', userRoute)

app.use((err, req, res, next) => {
  console.log('Unhandled error detected:' + err.message);
  res.send('500 - Server error');
});
app.use((req, res) => {
  console.log('Route is not handled');
  res.send('404 - Not found');
})

// EXPORT
module.exports = app;