// MODULES
const fetch = require('node-fetch');
const { url, accessToken } = require('./../utils/constant');

// INIT

// EXPORT LOGICS
module.exports = {
  updateUser: async (req, res, next) => {
    const id = req.body.id;
    delete req.body.id;
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(req.body)
    };
    try {
      const response = await fetch(`${url}/${id}`, options);
      const data = await response.json();
      res.status(200).json({
        message: 'Update user successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}