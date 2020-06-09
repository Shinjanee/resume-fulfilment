const express = require('express');
const port = process.env.PORT;
const app= express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongo_user:VwvmBKZFmXARA5ME@cluster0-r121x.gcp.mongodb.net/chatbot?retryWrites=true&w=majority";
const https = require('https');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var user_name = "";
var deg = "";
var pos = "";
var yr = ";"

app.post('/',function(req,res){

  pos = req.body.queryResult.parameters["position"];
  yr = req.body.queryResult.parameters["exp_years"];
  if (String(pos) != "undefined" && String(yr) != "undefined")
  {
      return res.json(200,
        {
          "fulfillmentText": "Thank you! Your response has been recorded"
            
        });
  }

  deg = req.body.queryResult.parameters["degree"];
  if (String(deg) != "undefined")
  {
      return res.json(200,
        {
          "fulfillmentText": "Experience?"
            
        });
  }

  user_name = req.body.queryResult.parameters["given-name"];
  if (String(user_name) != "undefined")
  {
      return res.json(200,
        {
          "fulfillmentText": "Education?"
            
        });
  }


  var skill = req.body.queryResult.parameters["Skills"];
  if (String(skill) != "undefined")
  {
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
                "fulfillmentText": result + "\n Would you like to save your resume?"
                  
              });
         ;
        });

      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
  }
});

MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("chatbot").collection("user_details");

  //insert
  var myobj = { name: skill, location: "Highway 37" };
  collection.insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    client.close();
  });
   client.close();
});
  

app.listen(port,function(err){
    if(err){
       console.log("Error in running server");
    }
    console.log("server started");
})



