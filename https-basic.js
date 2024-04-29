/*
this is a basic https server that works specifically with https; if you want just a regular http server, check the script called "http-basic.js"
*/

var https = require('https');
var url = require('url');
var fs = require('fs');

const options = {
  key: fs.readFileSync('localhost.key'), // if you have a different file name, change localhost to it
  cert: fs.readFileSync('localhost.crt') // if you have a different file name, change localhost to it
}

https.createServer(options, function (req, res) {
  var q = url.parse(req.url, true);
  var filePath = "";

  if (q.pathname === '' || q.pathname === '/') {
    filePath = "index.html";
  } else { // add else ifs if you want
    filePath = "404.html";
  }
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end('404 page not found')
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end()
  })
}).listen(3000);
