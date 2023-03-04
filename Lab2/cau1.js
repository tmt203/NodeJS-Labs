const http = require('http');
const url = require('url');

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lab02 - Bài 1</title>
  <style>
    table {
      border-spacing: 0.5em 0.5em;  
    }
  </style>
</head>
<body>
  <form action="/result">
    <table cellspacing="0" cellpadding="0">
      <tr>
        <td><label for="num1">Số hạng 1</label></td>
        <td><input id="num1" type="number" name="num1"><br></td>
      </tr>
      <tr>
        <td><label for="num2">Số hạng 2</label></td>
        <td><input id="num2" type="number" name="num2"><br></td>
      </tr>
      <tr>
        <td><label for="operator">Phép tính</label></td>
        <td><select name="operator" id="operator">
          <option value="" selected>Chọn phép tính</option>
          <option value="+">Cộng</option>
          <option value="-">Trừ</option>
          <option value="*">Nhân</option>
          <option value="/">Chia</option>
        </select></td>      
      </tr>
      <tr>
        <td colspan="1"></td>
        <td><button type="submit">Tính</button></td>
      </tr>
    </table>
  </form>
</body>
</html>
`;
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/') {
    res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
    res.end(template);  
  } else if (pathname === '/result' && query.operator === '') {
    res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
    res.end('Bạn chưa chọn phép toán');
  } else if (pathname === '/result') {
    const n1 = query.num1 * 1;
    const n2 = query.num2 * 1;
    const op = query.operator;

    let rs;
    switch (op) {
      case '+':
        rs = n1 + n2;
        break;
      case '-':
        rs = n1 - n2;
        break;
      case '*':
        rs = n1 * n2;
        break;
      case '/':
        rs = n1 / n2;
        break;
    }

    res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
    res.end(`${n1} ${op} ${n2} = <b>${rs}</b>`);
  } else {
    res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
    res.end('Đường dẫn không hợp lệ');
  }
});

server.listen(4000, () => console.log('Server is running on port 4000'));