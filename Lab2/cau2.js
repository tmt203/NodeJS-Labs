const http = require('http');
const url = require('url');

const template = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lab02 - Bài 2</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM="
    crossorigin="anonymous"></script>
</head>

<body>
  <div class="container col-8 col-sm-6 col-md-6 col-lg-4">
    <h3>Đăng nhập</h3>
    <form action="/login" method="post">
      <div class="mb-3">
        <label for="email" class="form-label">Enter email:</label>
        <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">    
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Enter password:</label>
        <input type="password" class="form-control" id="password" placeholder="Enter password" name="password">
      </div>    
      <button type="submit" class="btn btn-primary">Đăng nhập</button>
    </form>
  </div>

  <!-- Libs -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
    crossorigin="anonymous"></script>
</body>

</html>
`;

/*
  Testing Account:
  Email: user@gmail.com
  Password: 123456
*/
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
  if (pathname === '/') {
    res.end(template);
  } else if (pathname === '/login') {
    if (req.method !== 'POST')
      return res.end(`Phương thức ${req.method} không được hỗ trợ`)

    const chunks = [];    
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      const data = Buffer.concat(chunks).toString();
      const parsedData = new URLSearchParams(data);
      const dataObj = {};

      for (let pair of parsedData.entries()) {
        dataObj[pair[0]] = pair[1];
      }
      if (dataObj.email === '') {
        return res.end('Email không hợp lệ');
      }
      if (dataObj.password === '') {
        return res.end('Mật khẩu không hợp lệ');
      }
      if (dataObj.email !== 'user@gmail.com' || dataObj.password !== '123456') {
        return res.end('Email hoặc mật khẩu sai')
      }
      res.end('Đăng nhập thành công');
    })
  }
});

server.listen(4000, () => console.log('Server is running on port 4000'));