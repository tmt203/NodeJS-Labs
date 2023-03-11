// MODULES
const express = require('express');
const { body, validationResult } = require('express-validator');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const homeRoute = require('./routes/homeRoute');
const addRoute = require('./routes/addRoute');
const userRoute = require('./routes/userRoute');
const updateRoute = require('./routes/updateRoute');

const helpers = require('./utils/helpers');
const myReadRequestBody = require('./middlewares/myReadRequestBody');

// INIT
const app = express();
const store = new session.MemoryStore();

// MIDDLEWARES
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

// Handle data of form submission
// app.use(express.urlencoded({ extended: true }));

// Read body request as Json
// app.use(express.json());

// Telling middleware what string to look when do a request method
app.use(methodOverride('_method'));

// Session & Flash config
app.use(session({
  secret: 'I love cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: null   },
  store,
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});


// Routes
app.use('/:var(home)?', homeRoute);
app.use('/add', addRoute);
app.use('/user', userRoute);
app.use('/update', updateRoute);

app.post('/my-request-body', myReadRequestBody, (req, res) => {
  console.log(req.body);
  res.send('TEST');
})

app.use((err, req, res, next) => {
  // console.log('Unhandled error detected:' + err.message);
  res.render('error', { title: "Lỗi", error: { code: 500, title: "Server error", desc: err.message }, style: "error.css" });
});

app.use((req, res) => {
  // console.log('Route is not handled');
  res.render('error', { title: "Lỗi", error: { code: 404, title: "Not found", desc: 'Sorry, the page you request is not found.' }, style: "error.css" });
})

// EXPORT
module.exports = app;