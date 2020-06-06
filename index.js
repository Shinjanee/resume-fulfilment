const express = require('express');
const port = process.env.PORT;
const app= express();
app.use(express.urlencoded({extended:false}));
app.post('/',function(req,res){
   
    return res.json(200,
        {
            'fulfillmentText':"12:00 pm"
        });
 })
app.listen(port,function(err){
    if(err){
       console.log("Error in running server");
    }
    console.log("server started");
})