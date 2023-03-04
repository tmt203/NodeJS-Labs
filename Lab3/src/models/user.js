const fs = require('fs');

const user = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/user-data.json`));
const isValidUser = (email, password) => email === user.email && password === user.password;

module.exports = {
  user,
  isValidUser,
}