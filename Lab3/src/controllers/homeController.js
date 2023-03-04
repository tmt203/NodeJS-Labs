const fs = require('fs');

module.exports = {
    getAllProducts: (req, res) => {
        if (req.session.authenticated) {
            fs.readFile(`${__dirname}/../dev-data/data/user-data.json`, 'utf-8', (err, data) => {
                if (err) return console.log(err);
                res.render('home', { products: JSON.parse(data).products });
            })
        } else {
            res.redirect('/login');
        }
    },
    addProduct: (req, res) => {
        fs.readFile(`${__dirname}/../dev-data/data/user-data.json`, 'utf-8', (err, data) => {
            if (err) return console.log(err);
            console.log(req.body);
            if (Object.keys(req.body).length === 0) return res.send('missing data');
            const user = JSON.parse(data);
            const newId = user.products[user.products.length - 1].id + 1;
            const newProduct = Object.assign(
                { id: newId },
                req.body,
            );
            user.products.push(newProduct);
            fs.writeFile(`${__dirname}/../dev-data/data/user-data.json`, JSON.stringify(user), err => {
                if (err) return console.log(err);
                res.redirect('/home');
            });
        })
    },
    deleteProduct: (req, res) => {
        fs.readFile(`${__dirname}/../dev-data/data/user-data.json`, 'utf-8', (err, data) => {
            if (err) return console.log(err);
            const user = JSON.parse(data);
            const index = user.products.findIndex(p => p.id === req.params.id * 1);
            user.products.splice(index, 1);
            fs.writeFile(`${__dirname}/../dev-data/data/user-data.json`, JSON.stringify(user), err => {
                if (err) return console.log(err);
                res.redirect('/home');
            });
        });
    }
}