const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('GET response');
    res.end();
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        res.writeHead(201, { 'Content-Type': 'text/plain' });
        res.write('POST response successfully!');
        res.end();
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write('Error on POST data');
        res.end();
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.write('Method not allowed');
    res.end();
  }
});

server.listen(3001, () => {
  console.log('Server listening on port 3001');
});
