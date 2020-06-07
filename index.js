const express = require('express');
const port = process.env.PORT;
const app= express();

const https = require('https');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.post('/',function(req,res){

  var skill = req.body.queryResult.parameters["skill_name"];

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
        result+= (i+1).toString()+" Title: "+jobsArray[i].title +" \nURL: "+ jobsArray[i].url;
     }
    return res.json(200,
        {
          "fulfillmentMessages": [
            {
              "text": {
                "text": [result]
              }
            }
          ]
            
        });
   ;
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
   
   
 })
app.listen(port,function(err){
    if(err){
       console.log("Error in running server");
    }
    console.log("server started");
})