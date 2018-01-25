var http = require("http");
var url = require("url");
var moment = require("moment");
const TPLSmartDevice = require('tplink-lightbulb')

var bip = '';  // Enter the bulbs IP - You can find this using your router or the scan command on Konsumer's tplink-lightbulb API.

http.createServer(function(req, res) {

  var parsedUrl = url.parse(req.url, true); // true to get query as object
  var queryAsObject = parsedUrl.query;
  //console.log(JSON.stringify(queryAsObject));
var now = moment();
var formatted = now.format('HH:mm:ss YYYY-MM-DD  Z');
console.log(''); 
console.log(formatted);

console.log('');  
console.log('Given Temp: ' + queryAsObject.ct);
var temp = parseInt(queryAsObject.ct, 10);

if (temp < 2500) {
var	ctmp = 2500;

} else if (temp > 6500){
var	ctmp = 6500;
		
} else {
var ctmp = temp;
	
}
//console.log(temp);
const bulb = new TPLSmartDevice(bip);
//var ctmp = temp;
console.log('Bulb Temp: ' + ctmp);
console.log('');
bulb.power(true, 5000, {hue: 0, saturation: 0, color_temp: ctmp})
.then(status => {
	console.log(status)
})
.catch(err => console.error(err))  

res.end(JSON.stringify(queryAsObject));

}).listen(8080);

console.log("Server listening on port 8080");