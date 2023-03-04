const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const loginRoute = require('./src/routes/loginRoute');
const homeRoute = require('./src/routes/homeRoute');
const updateRoute = require('./src/routes/updateRoute');

const app = express();
const store = new session.MemoryStore();

// Static files
app.use(express.static(path.join(`${__dirname}/src/public`)));

// Telling middleware what string to look
app.use(methodOverride('_method'));

// Handlebars
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: {
        currencyFormatter: (value) => {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            return formatter.format(value);
        },
        add: (a,b) => a+b,
        stringToInt: (str) => str*1,
    },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(`${__dirname}/src/views`));

// BodyParser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    // console.log(res.locals.message);

    next();
});

// Routes
app.use('/login', loginRoute);
app.use('/', homeRoute);
app.use('/home', homeRoute);
app.use('/update-product', updateRoute);

app.use((err, req, res, next) => {
    res.send('500 - Server error');
});
app.use((req, res) => {
    res.send('404 - Not found');
})
// Server
app.listen(3000, () => console.log('App is running on port 3000'));