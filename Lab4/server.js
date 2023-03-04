// MODULES
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./src/app');

// PORT
const port = process.env.PORT || 3000;

// RUN SERVER
app.listen(port, () => console.log(`App running on port ${port}`));