// MODULES
const fetch = require('node-fetch');
const { url, accessToken } = require('./../utils/constant');
// INIT

// EXPORT LOGICS
module.exports = {
  home: async (req, res, next) => {
    // Fetch data from https://gorest.co.in/public/v2/users?page=1&per_page=20
    try {
      const page = req.query.page * 1 || 1;
      const response = await fetch(`${url}?page=${page}&per_page=20`);
      const data = await response.json();
      res.render('index', {
        users: data, currentPage: page, totalPage: 3,
      });

    } catch (err) {
      next(err);
    }
  },
  deleteUser: async (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name.replaceAll('+', ' ');
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
    };
    try {
      await fetch(`${url}/${id}`, options);
      // const data = await response.json();
      // res.status(200).json({
      //   message: 'Delete user successfully',
      //   data,
      // });
      req.session.flash = { deletedUserName: name };
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
}