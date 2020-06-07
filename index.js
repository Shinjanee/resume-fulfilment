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
        result+= (i+1).toString()+" "+jobsArray[i].title +" and "+ jobsArray[i].url +"\n";
     }
    return res.json(200,
        {
          "fulfillmentMessages": [
  {
    "buttons": [
      {
        "openUrlAction": {
          "url": "https://linkUrl.com"
        },
        "title": "AoG Card Link title"
      }
    ],
    "formattedText": "AoG Card Description",
    "image": {
      "url": "http://imageUrl.com"
      "accessibilityText": "Image description for screen readers"
    },
    "platform": "google",
    "subtitle": "AoG Card Subtitle",
    "title": "AoG Card Title",
    "type": "basic_card"
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