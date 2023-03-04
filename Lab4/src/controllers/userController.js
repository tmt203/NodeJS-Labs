module.exports = {
  getUserById: async (req, res) => {
    const id = req.params.id * 1;
    const response = await fetch('https://gorest.co.in/public/v2/users/' + id);
    const data = await response.json();
    console.log(data);
    res.render('user', { user: data });
  }
}