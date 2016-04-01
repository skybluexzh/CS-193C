var http = require('http');
var url = require('url');

var server = http.createServer(function(request, response) {
      
      var urlInfo = url.parse(request.url,true);
      if (urlInfo.pathname == "/simple.html") {
         response.writeHead(200, {"Content-Type": "text/html"});
         response.end("Simple Request");
      } else if (urlInfo.pathname == "/complex.html") {
         response.writeHead(200, {"Content-Type": "text/html"});
         response.write("<b>Complex Request</b><br />");
         response.write("Your name is " + urlInfo.query.name + "<br />");
         response.write("Your phone is " + urlInfo.query.phone + "<br />");
         response.end();
      } else {
         response.writeHead(404, {"Content-Type": "text/html"});
         response.end("404 Not Found :-(");
      }
   });
   
server.listen(8080);