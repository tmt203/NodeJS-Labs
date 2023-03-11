// MODULES
const fetch = require('node-fetch');
const { url } = require('./../utils/constant');

// INIT

// EXPORT LOGICS
module.exports = {
  getUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();
      res.render('profile', { user: data });
    } catch (err) {
      next(err);
    }

  }
}