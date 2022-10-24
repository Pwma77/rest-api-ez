const mongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://dan:1234@cluster0.eyts3.mongodb.net/totherogue?retryWrites=true&w=majority";

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
){
    mongoClient.connect(uri, function(err, dbInstance){
        if (err){
            console.log(`-MongoDB connection- ERROR: ${err}`);
            failureCallback(err);//caught by calling function
        }else{
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("-Mongo connection- SUCCESS");

            successCallback(dbCollection);
        }
    });
}

//db init
db.initialize(dbName, collectionName, function(dbCollection){
    //getting items
    dbCollection.find().toArray(function(err, result){
        if (err) throw err;
        console.log(result);
    });

    //crud routes

}, function(err){
    throw (err);
});


module.exports = {
    initialize
};
