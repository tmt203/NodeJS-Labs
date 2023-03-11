// MODULES
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // CONFIGURE .ENV
const app = require('./src/app');

// INIT
const port = process.env.PORT || 3000;

// SERVER
app.listen(port, () => console.log(`Server is running on port ${port}`));