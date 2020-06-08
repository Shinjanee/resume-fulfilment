const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://mongo_user:VwvmBKZFmXARA5ME@cluster0-r121x.gcp.mongodb.net/chatbot?retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("chatbot").collection("user_details");

  //insert
  var myobj = { name: "Company Inc", location: "Highway 37" };
  collection.insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    client.close();
  });
   // perform actions on the collection object
   client.close();
});