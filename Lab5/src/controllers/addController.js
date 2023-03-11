// MODULES
const fetch = require('node-fetch');
const { url, accessToken } = require('./../utils/constant');

// INIT

// EXPORT LOGICS
module.exports = {
  add: (req, res) => res.render('add'),
  addUser: async (req, res, next) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(req.body)
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      res.status(200).json({
        message: 'Add success',
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}