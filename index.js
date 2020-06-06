const express = require('express');
const port = process.env.PORT;
const app= express();
const https = require('https');
app.use(express.urlencoded({extended:false}));
app.post('/',function(req,res){

  https.get("https://jobs.github.com/positions.json?page=1&search=code", (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
  	dt = JSON.parse(data)
    console.log(dt);
    toSend = 'Title:' ${dt.title}
    return res.json(200,
        {
            'fulfillmentText':toSend
        });
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


