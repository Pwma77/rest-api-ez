const express = require("express");//only importing express

const cors = require("cors");//cross origin rules
const bodyParser = require('body-parser');//for returning and understanding json

const sql = require('mssql');//for connecting to ms sql server

var app = express();//creating the instance of express, as if it were a constructor


const port = 40000;

var config = {
	user: 'sa',
	password: 'notPassw0rd',
	server: 'localhost',
	port: 1433,
	database: 'shoppingcart'
}//json obj

const pool = new sql.ConnectionPool(config);//to create the pool, config is passed to USE A CERTAIN ELEMENT
const poolConnect = pool.connect();//to reference

app.use(bodyParser.json({limit:'100mb'})); //body-parser has a limit of 'Xmb'
app.use(bodyParser.urlencoded({
	extended:true,
	limit:'100mb'
}))
app.use(cors());

//until now, it is vulnerable, so we have to be sure about who's gonna connect
//Build here

app.all('*', function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');//This comes from these IP add's and goes for every framework
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');//PURE
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();

});//* everyport can connect to my server, but if there is 
//an specific IP or domain, this is the ONLY ONE
//asterisks allow connections from everywhere

//AN STARTING POINT IN CLIENT, ENDPOINT IN SERVER

//AN ENDPOINT/EXTREMO => where i'm going to catch it
//RUBY-NOT TOO EASY, JAVA AND C# WEIRD (OVERLY COMPLEX), PYTHON A BIT STRANGE, NODE EZ

app.get('/api/helloworld', (req, res) => {
	res.send("Hello World!!");

});//End part from the .com
//{body and still be a parameter, understands what it is going to be written}

app.get('/api/getarray', (req, res) => {
	var array = ['One', 'Two', 'Three'];
	res.send(array);//to send the array

});

app.get('/api/greninja', (req, res) => {
	var poke = ["Number: 658", "Name: Greninja", "Type: Water/Dark"];
	res.send(poke);//to send the array
});

//ENDPOINT not FUNCTION
app.post('/api/postname', (req, res) => {
	var bodyOfRequestHereBruh = req.body; //things inside the req
	
	var theNameThatISent = bodyOfRequestHereBruh.name;//body properties

	res.send(theNameThatISent);
});

//POOL, async and function, request and response the content
//a function hits from the internet
//since it is not an endpoint, we cannot use postman nor google to show the info
async function dbpool(req, res){
	var requestBody = req.body;

	let q = "SELECT * FROM users";

	await poolConnect;//await in fact of async of connecting through pool

	try{
		const request = pool.request();//request for the sql point, not as req above
	//instance pool from sql query

		const result = await request.query(q);//to send the consult regarding the query
		//It's good to know is working
		console.dir(result);//in order to send the result, not seen as string but as json detailed
		console.log(result);

		//it's a set of records, not exactly data. Just to know if exists, then...
		if(result.recordset){
			if(result.recordset.length>0){
				res.send(result.recordset);
			}
		}return result;

	}catch(err){
		console.error('sql error', err);
	}

}

app.post('/api/deadpool', (req, res) => {

	dbpool(req,res);//Go here and hit the function above

})






//until here there is not being listened as a server
app.listen(port, function(){
	console.log("REST API IS LIVE!");
});//no more data is needed to be in function
