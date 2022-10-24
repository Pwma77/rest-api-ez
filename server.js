var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

server.use(bodyParser.json());

var app = express();
const port = 4000;

const db = require("./db");//to import db file
const dbName = "totherogue";
const collectionName = "tries";

server.post("/tries", (req, res) => {
	const item = req.body; //variable through 
	db.collection.insertOne(item, (error, result) => { //insertOne callback
		if (error) throw error;
		
		//return updated list
		dbCollection.find().toArray((_error, _result) => { //find callback
            if (_error) throw _error;
            response.json(_result);
		});
	});
});

//To get ONE
server.get("/tries/:id", (req, res) => {
	const itemId = req.params.id;

	dbCollection.findOne({ id: itemId}, (error, result) => {
		if (error) throw error;
		response.json(result);
	});
});

/*To get all
server.get("/tries", (request, response) => {
    // return updated list
    dbCollection.find().toArray((error, result) => {
        if (error) throw error;
        response.json(result);
    });
});
*/

app.post("/tries", function (req, res){
	var dbo = db("totherogue");
	var firstTry = 0;
	var tryUpdate = firstTry++;
	var data = { _id: 1};
	var newData = { $set: {tries: tryUpdate}};
	dbo.collection("tries").updateOne(data, newData, function(err, res){
		if (err) throw err;
		console.log("Tries updated");
	});
});

/*
server.put("/tries/:id", (req, res) => {
	const itemId = req.params.id;
	const item = req.body;
	console.log("Tries ID: ", itemId, ", Tries ", item);

	dbCollection.updateOne({ id: itemId }, { $set: item}, (error, result) => { //TO UPDATE
		if (error) throw error;
		//send back updated list
		dbCollection.find().toArray(function(_error, _result) {
			if (_error) throw _error;
			response.json(_result);
		});
	});
});
*/
/*BODYPARSER, HEADERS, /API ENDPOINT-----------
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({
	extended:true,
	limit:'100mb'
}))
app.use(cors());

app.all('*', function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');//This comes from these IP add's and goes for every framework
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');//PURE
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();

});

app.post('/api', (req, res) => {
	var bodyy = req.body;
	
	var namee = bodyy.namee;

	res.send(namee);
});
*/

//start server
app.listen(port, function(){
	console.log(`REST API IS LIVE AT ${port}`);
});