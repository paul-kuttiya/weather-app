var router = require('express').Router(),
		request = require("request");

var key ='AIzaSyASMGhZ2VGx_Ef3ae7OhD4MCLMEKlx22Bc'

router.get('/', function(req, res, next) {
  var url = 'http://ip-api.com/json';

	request({
		url: url,
		json: true
	}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			//send back user localtion api
			var lat = body.lat,
					lon = body.lon;

			res.render('index', { lat: lat, lon: lon });
		}
	});
});

router.post('/posting', function(req, res) {
	var latLong = req.body,
			geolocation = Object.keys(latLong)[0]
	
	var googleApi = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geolocation}&radius=100&key=${key}`;

	request({
		url: googleApi,
		json: true
	}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			//send back place id
			res.send(body.results[0]);
		}
	});
});


module.exports = router;
