const express = require('express');
const port = process.env.PORT;
const app= express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongo_user:VwvmBKZFmXARA5ME@cluster0-r121x.gcp.mongodb.net/chatbot?retryWrites=true&w=majority";
var skill = ""
const https = require('https');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.post('/',function(req,res){

  skill = req.body.queryResult.parameters["skill_name"];

  https.get("https://jobs.github.com/positions.json?description="+skill+"&location=new+york", (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
     console.log(skill+",");
     console.log(JSON.parse(data));
     var jobsArray =  JSON.parse(data);
     var result="";
     for(var i=0;i<jobsArray.length;i++)
     {
        result = result + " \n" + (i+1).toString() + " " + jobsArray[i].title + " and " + jobsArray[i].url + "\n";
     }
    return res.json(200,
        {
          "fulfillmentText": result
            
        });
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
   
   
 })

// MongoClient.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const collection = client.db("chatbot").collection("user_details");
//    var myobj = { name: skill, location: "India" };
//   collection.insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     client.close();
//   });
//    client.close();
// });

app.listen(port,function(err){
    if(err){
       console.log("Error in running server");
    }
    console.log("server started");
})