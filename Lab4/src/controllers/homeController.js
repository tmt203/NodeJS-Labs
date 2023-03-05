const fetch = require('node-fetch');
const url = "https://gorest.co.in/public/v2/users";
// Access token get from https://gorest.co.in/my-account/access-tokens
const accessToken = '0c7261c430b9cb4d306ea926c90354979874276ea8b7c52ce1c325713365477e';

module.exports = {
  getHome: async (req, res, next) => {
    if (req.session.authenticated) {
      try {
        // Fetch users data from https://gorest.co.in/public/v2/users
        const page = req.query.page * 1 || 1;
        const response = await fetch(`${url}?page=${page}`);
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
  addUser: async (req, res, next) => {    
    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(req.body)
    }
    fetch(url, options)
      .then(response => response.json())
      .then(json => {
        // Respond to the client-side request with the JSON data received from the API endpoint
        res.json(json);
      })
      .catch(err => {
        // Handle any errors that occur during the request
        console.log("Something went wrong.");
        next(err);
      });
  },
  updateUser: (req, res, next) => {
    const id = req.body.id;
    delete req.body.id;
    const options = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(req.body),
    }
    fetch(url+'/'+id, options)
      .then(response => response.json())
      .then(json => {
        // Respond to the client-side request with the JSON data received from the API endpoint
        res.json(json);
      })
      .catch(err => {
        // Handle any errors that occur during the request
        console.log("Something went wrong.");
        next(err);
      });
  },
  deleteUser: (req, res, next) => {
    const options = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
    }
    fetch(url+'/'+req.body.id, options)
      .then(response => {
        res.redirect('/home');
      })
      .catch(err => {
        // Handle any errors that occur during the request
        console.log("Something went wrong.");
        next(err);
      });
  }
}