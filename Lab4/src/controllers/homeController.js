const paginate = (model) => {
  return (req, res, next) => {
    const page = req.query.page * 1;
    const limit = req.query.limit * 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {}

    if (endIndex < users.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      }
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      }
    }

    result.results = users.slice(startIndex, endIndex);
    res.paginatedResult = result;
    next();
  }
}

module.exports = {
  getHome: async (req, res, next) => {
    if (req.session.authenticated) {
      try {
        // Fetch users data from https://gorest.co.in/public/v2/users
        const page = req.query.page * 1 || 1;
        const response = await fetch('https://gorest.co.in/public/v2/users?page=' + page);
        const data = await response.json();
        res.render('home', { users: data, currentPage: page, totalPage: 3 });
      } catch (err) {
        console.log('Something went wrong.');
        next(err);
      }
    } else {
      res.redirect('/login');
    }
  },
  logOut: (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  }
}