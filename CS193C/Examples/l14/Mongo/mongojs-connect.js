var databaseUrl = "test";
var collections = ["cities", "students"];
var db = require('mongojs').connect(databaseUrl, collections);

db.cities.find({}, function(err, cities) {
      if (err) {
         console.log("Uh Oh: " + err);
      } else if (!cities) {
         console.log("No Cities Returned");
      } else {
         for(var i = 0; i<cities.length; i++) {
            console.log(cities[i].name);
         }
      }
   });