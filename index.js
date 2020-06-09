const express = require('express');
const port = process.env.PORT;
const app= express();
const mongoose = require("./config/mongoose");
const User = require('./models/user');
const https = require('https');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
var id;
var educationArray = [];
var experienceArray=[];
app.post('/',function(req,res){

 
  var action = req.body.queryResult.action;
  if(action =="getName"){
    experienceArray=[];
    educationArray = [];
      User.create({
        name:req.body.queryResult.queryText,
        education:[],
        experience:[],
        project:"N.A",
        skills:"N.A",
        interests:"N.A",
        achievements:"N.A"

        
    },function(err,user)
    {
        if(err)
        {
            console.log("Error");
            return;
        }
        console.log(" user created \n");
          id = user._id;
          console.log(id);
          return res.json(200,
            {
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": ["Enter skills"]
                  }
                }
              ]
                
            });    
        
    });
  
  }
  else if(action=="getSkills"){


    User.findByIdAndUpdate(id,{"skills":req.body.queryResult.queryText},function(err,user)
        {
           if(err)
           {
             console.log("cant be updated");
             return;
           }
           console.log("updated");
           return res.json(200,
            {
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": ["Enter interests"]
                  }
                }
              ]
                
            });
        });

  }
  else if(action=="getInterest"){


    User.findByIdAndUpdate(id,{"interests":req.body.queryResult.queryText},function(err,user)
        {
           if(err)
           {
             console.log("cant be updated");
             return;
           }
           console.log("updated");
           return res.json(200,
            {
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": ["Enter achievements"]
                  }
                }
              ]
                
            });
        });
       

  }
  else if(action=="getAchievements"){


    User.findByIdAndUpdate(id,{"achievements":req.body.queryResult.queryText},function(err,user)
        {
           if(err)
           {
             console.log("cant be updated");
             return;
           }
           console.log("updated");
           return res.json(200,
            {
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": ["Enter experience"]
                  }
                }
              ]
                
            });
        });

  }
  else if(action=="getEducation"){
      
    var degree = req.body.queryResult.parameters["degree"];
    var university_name = req.body.queryResult.parameters["university_name"];
    var location = req.body.queryResult.parameters["city"];
    var percentage = req.body.queryResult.parameters["percentage"];
    educationArray.push({
      "degree": degree,
       "university_name":university_name,
       "location":location,
       "percentage":percentage

    });

    User.findByIdAndUpdate(id,{"education":educationArray},function(err,user)
        {
           if(err)
           {
             console.log("cant be updated");
             return;
           }
           console.log("updated");
           return res.json(200,
            {
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": ["Want to enter more?"]
                  }
                }
              ]
                
            });
        });

  }
  else if(action=="getExperience"){


    var position = req.body.queryResult.parameters["position"];
    var duration = req.body.queryResult.parameters["duration"];
    var location = req.body.queryResult.parameters["city"];
    var company_name = req.body.queryResult.parameters["company_name"];
    experienceArray.push({
      "position":position,
      "duration":duration,
      "location":location,
      "company_name":company_name
    });

    User.findByIdAndUpdate(id,{"experience":experienceArray},function(err,user)
        {
           if(err)
           {
             console.log("cant be updated");
             return;
           }
           console.log("updated");
           return res.json(200,
            {
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": ["Want to enter more?"]
                  }
                }
              ]
                
            });
        });

    

  }
  else if(action == "getJobBySkill"){
    var skill = req.body.queryResult.parameters["skill_name"];

    https.get("https://jobs.github.com/positions.json?description="+skill+"&location=new+york", (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      
      var jobsArray =  JSON.parse(data);
      var result="";
      for(var i=0;i<jobsArray.length;i++)
      {
          result+= (i+1).toString()+jobsArray[i].title +" and "+ jobsArray[i].url +"  \n";
      }
      return res.json(200,
          {
            "fulfillmentMessages": [
              {
                "text": {
                  "text": [result +"Want to create resume?"]
                }
              }
            ]
              
          });
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
    
  }
  else if(action == "showSkills"){
    User.findById(id,'skills',function(err,user)
        {
           if(err)
           {
             console.log("cant be found");
             return;
           }
           console.log("found");
           return res.json(200,
            {
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": [User.skills]
                  }
                }
              ]
                
            });
        });

  }

});

app.listen(port,function(err){
    if(err){
       console.log("Error in running server");
    }
    console.log("server started");
    
});