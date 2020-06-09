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
var univ_name="";
var univ_loc="";
var marks="";
var pos = "";
var comp_name="";
var comp_loc="";
var duration = "";

app.post('/',function(req,res){

  pos = req.body.queryResult.parameters["position"];
  comp_name = req.body.queryResult.parameters["comp_name"];
  comp_loc = req.body.queryResult.parameters["location"];
  duration = req.body.queryResult.parameters["duration"];
  if (String(pos) != "undefined" && String(comp_name) != "undefined" && String(comp_loc) != "undefined" && String(duration) != "undefined")
  {
      MongoClient.connect(uri, function(err, client) {
       if(err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
       }
       console.log('Connected...');
       const collection = client.db("chatbot").collection("user_details");

      //insert
      var myobj = { name: user_name, education: {degree: deg, school: univ_name, location: univ_loc, grade: marks}, experience: {title: pos, company: comp_name, location: comp_loc, duration : duration }};
      collection.insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        client.close();
      });
       client.close();
    });

      return res.json(200,
        {
          "fulfillmentText": "Thank you! Your response has been recorded"
            
        });
  }

  deg = req.body.queryResult.parameters["degree"];
  univ_name = req.body.queryResult.parameters["univ_name"];
  univ_loc = req.body.queryResult.parameters["location"];
  marks = req.body.queryResult.parameters["percentage"];
  if (String(deg) != "undefined" && String(univ_name) != "undefined" && String(univ_loc) != "undefined" && String(marks) != "undefined")
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
  

app.listen(port,function(err){
    if(err){
       console.log("Error in running server");
    }
    console.log("server started");
})



