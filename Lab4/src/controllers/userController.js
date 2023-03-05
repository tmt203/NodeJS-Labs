const fetch = require('node-fetch');

module.exports = {
  getUserById: async (req, res) => {
    const id = req.params.id * 1;
    fetch(`https://gorest.co.in/public/v2/users/${id}`)
      .then(response => response.json())
      .then(json => res.render('user', { user: json }));
  }
}