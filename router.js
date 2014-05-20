var fs = require('fs');
var http = require('http');
var path = require('path');
var mime = require('./node_modules/mime');

function router (req, res) {
  if (req.url === '/') {
    fs.readFile('./public/index.html', function (err, data) {
      if (err) {
        res.end('OOPS');
      }

      res.end(data);
    });
  } else {
    fs.readFile("." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('error');
      }

      res.end(data);
    });
  }
}

module.exports = router;