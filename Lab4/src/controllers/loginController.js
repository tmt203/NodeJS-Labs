const { isValidUser } = require('./../models/user');

module.exports = {
  getLogin: (req, res) => {
    return res.render('login');
  },
  logOut: (req, res, next) => {
    req.session.destroy();
    next();
  },
  checkAuth: (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      if (req.session.authenticated && isValidUser(email, password)) {
        res.redirect('/home');
      } else {
        if (isValidUser(email, password)) {
          req.session.authenticated = true;
          res.redirect('/home');
        } else {
          req.session.message = {
            type: 'danger',
            intro: 'Tài khoản hoặc mật khẩu sai!',
            message: 'Hãy kiểm tra lại thông tin đăng nhập.'
          };
          res.redirect('/login');
        }
      }
    } else {
      req.session.message = {
        type: 'danger',
        intro: 'Thiếu thông tin!',
        message: 'Vui lòng nhập đầy đủ thông tin đăng nhập.'
      };
      res.redirect('/login');
    }
  }
}