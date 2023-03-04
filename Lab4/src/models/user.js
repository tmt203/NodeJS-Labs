module.exports = {
  isValidUser: (email, password) => email == process.env.EMAIL && password == process.env.PASSWORD
}