var databaseUrl = "test";
var collections = ["cities", "students", "comments"];
var db = require('mongojs').connect(databaseUrl, collections);

var http = require('http');
var url = require('url');

function writeForm(response) {
	response.write('<form action="http://localhost:8080/">');  
	response.write('Name: <input type="text" name="name" /><br />');
	response.write('<textarea name="contents"></textarea>');
	response.write('<input type="submit" />');
	response.write('</form>');
}

var server = http.createServer(function(request, response) {
		function writePage(err, saved) {
			db.comments.find({}, function(err, comments) {
				response.writeHead(200, {"Content-Type": "text/html"});

				if (!err && comments) {
					for(var i=0; i<comments.length; i++) {
						response.write("<p><b>" + comments[i].name + "</b>: ");
						response.write(comments[i].contents + "</p>");
					}
				}
				writeForm(response);
				response.end();
			});
		}				
		
		var urlInfo = url.parse(request.url,true);
		
		if (Object.keys(urlInfo.query).length !== 0) {
			db.comments.save(urlInfo.query, writePage);		
		} else {
			writePage();
		}		
    });
      
server.listen(8080);

