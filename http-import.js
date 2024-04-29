/*
this is a *fancier* version of the first http server, it now uses imports!
*/
import http from 'node:http';
import url from 'node:url';
import fs from 'node:fs';

http.createServer(function (req, res) {
  var q = url.parse(req.url, true).pathname;
  var file = "";
  if (q === '' || q === '/') {
    file = 'index.html';
  } else {
    file = '404.html';
  }
  fs.readFile(file, function (err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end('404 not found');
    }
    res.writehead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(3000);
