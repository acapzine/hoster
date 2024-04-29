/*
like the other http-import script, its the same as the other one but it uses imports
*/
import https from 'node:https';
import url from 'node:url';
import fs from 'node:fs';

const options = {
  key: fs.readFileSync('localhost.key'), //change to whatever the filename is
  cert: fs.readFileSync('localhost.crt') //change to whatever the filename is
}
https.createServer(options, function (req, res) {
  var q = url.parse(req.url, true).pathname;
  var file = "";
  if (q === '' || q === '/') {
    file = 'index.html';
  } else { // add in else ifs if you want 
    file = '404.html'; // change to your 404 file
  }
  fs.readFile(file, function (err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end('404 not found');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(3000);
