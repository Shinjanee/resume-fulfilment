//require the library
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://mongo_user:j0FSSp1FlEwuWnPi@cluster0.r121x.gcp.mongodb.net/chatbot?retryWrites=true&w=majority');
//aqcuire the connection
const db = mongoose.connection;
//error
db.on('error',console.error.bind(console,'error connecting to db'));
//up and running tehn  print the message
db.once('open',function(){
    console.log("Successfully connected to db");
});
module.exports= db;
