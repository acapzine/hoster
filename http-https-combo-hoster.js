import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import url from 'node:url';
// end imports
// change stuff below, not above this
const options = {
    key: fs.readFileSync('localhost.key'),
    cert: fs.readFileSync('localhost.crt')
}
var usehttps = false; // change this to true if you want to use https
var port = 3000; // the port to listen on
var pathToIndexPage = "index.html"; // path to index page; example is in the main directory/where you have the hosting file
var pathTo404Page = "404.html"; // path to 404 error page; example is in the main directory/where you have the hosting file
// change above, not below this

if (usehttps) {
    https.createServer(options, (req, res) => {
        var q = url.parse(req.url, true).pathname;
        var file = "";
        if (q === '' || q === '/') {
            file = pathToIndexPage;
        } else {
            file = pathTo404Page;
        } // you can add elseifs if you want
        fs.readFile(file, (error, data) => {
            if (error) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end('404 not found');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }).listen(port);
} else {
    http.createServer((req, res) => {
        var q = url.parse(req.url, true).pathname;
        var file = "";
        if (q === '' || q === '/') {
            file = pathToIndexPage;
        } else {
            file = pathTo404Page;
        } // you can add elseifs if you want
        fs.readFile(file, (error, data) => {
            if (error) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end('404 not found');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }).listen(port);
}