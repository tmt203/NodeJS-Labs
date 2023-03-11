const myReadRequestBody = (req, res, next) => {
  chunks = [];
  req.on('data', chunk => {
    chunks.push(chunk);
  });
  req.on('end', () => {
    // Convert chunks to raw string data
    const data = Buffer.concat(chunks).toString();
    // Convert data to JSON format
    const pairs = data.split('&');
    let json = {};
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      json[key] = decodeURIComponent(value);
    });
    // Assign result to req.body
    req.body = json;
    next();
  });
};

module.exports = myReadRequestBody;