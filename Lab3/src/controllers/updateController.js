const fs = require('fs');
module.exports = {
  getUpdateProduct: (req, res) => {
    fs.readFile(`${__dirname}/../dev-data/data/user-data.json`, 'utf-8', (err, data) => {
      if (err) return console.log(err);
      const user = JSON.parse(data);
      const product = user.products.find(p => p.id === req.params.id * 1);
      res.render(`update-product`, { updateProduct: product });
    });
  },
  updateProduct: (req, res) => {
    fs.readFile(`${__dirname}/../dev-data/data/user-data.json`, 'utf-8', (err, data) => {
      if (err) return console.log(err);
      const user = JSON.parse(data);
      const index = user.products.findIndex(p => p.id === req.params.id * 1);
      user.products[index] = Object.assign({id: req.params.id}, req.body);
      fs.writeFile(`${__dirname}/../dev-data/data/user-data.json`, JSON.stringify(user), err => {
        if (err) return console.log(err);
        res.redirect('/home');
      });
    });
  }
}