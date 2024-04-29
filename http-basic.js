/*
this is a basic http server that runs *only* with http; see different script for one that works with https
*/

var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filePath = "";

  if (q.pathname === '' || q.pathname === '/') { // you can add, remove, or change these as you'd like
    filePath = "index.html";
  } else { // add else ifs if you want
    filePath = "404.html"; // replace with whatever your 404 page is
  }

  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 page not found")
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(3000);
