var http = require('https');
var express = require('express');
var app = express();

var appId = process.env.MILKCOCOA_APP_ID;
var apikey = process.env.MILKCOCOA_APIKEY;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/auth', function(req, res) {
	//ここで認証とアクセス制御をやる
	grant(appId, apikey).then(function(data) {
		res.json(data);
	});
});

app.listen(process.env.PORT || 3000);


function grant(appId, apikey) {
	const URL = `https://pubsub1.mlkcca.com/api/grant/${appId}/${apikey}`;
	return new Promise((resolve, reject) => {
		http.get(URL, (res) => {
			let body = '';
			res.setEncoding('utf8');

			res.on('data', (chunk) => {
			  body += chunk;
			});

			res.on('end', (res) => {
			  resolve(JSON.parse(body));
			});
		}).on('error', (e) => {
			reject(e);
		});
	});
}