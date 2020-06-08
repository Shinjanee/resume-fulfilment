const express = require('express');
const port = process.env.PORT;
const app= express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongo_user:VwvmBKZFmXARA5ME@cluster0-r121x.gcp.mongodb.net/chatbot?retryWrites=true&w=majority";
const https = require('https');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.post('/',function(req,res){

  var user_name = req.body.queryResult.parameters["given-name"];
  if (user_name.toString().trim().length() != 0)
  {
      return res.json(200,
        {
          "fulfillmentText": user_name + "\n Education?"
            
        });
  }


  var skill = req.body.queryResult.parameters["Skills"];
  if (skill.toString().trim().length() != 0)
  {
    return res.json(200,
        {
          "fulfillmentText": skill + "\n Would you like to save your resume?"
            
        });
  }
  });

app.listen(port,function(err){
    if(err){
       console.log("Error in running server");
    }
    console.log("server started");
})



