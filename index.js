const express = require('express');
const port = process.env.PORT;
const app = express();
const mongoose = require("./config/mongoose");
const User = require('./models/user');
const https = require('https');
const getname_controller = require('./controllers/getname_controller');
const getemail_controller = require('./controllers/getemail_controller');
const getskills_controller = require('./controllers/getskills_controller');
const getinterests_controller = require('./controllers/getinterests_controller');
const geteducation_controller = require('./controllers/geteducation_controller');
const getprojects_controller = require('./controllers/getprojects_controller');
const getexperience_controller  = require('./controllers/getexperience_controller');
const getachievements_controller  = require('./controllers/getachievements_controller');
const showresume_controller  = require('./controllers/showresume_controller');
const showdetails_controller = require('./controllers/showdetails_controller');
const updateresume_controller = require('./controllers/updateresume_controller');
const modifyaction_controller = require('./controllers/modifyaction_controller');
const getindex_controller = require('./controllers/getindex_controller');
const getjobbyskill_controller = require('./controllers/getjobbyskill_controller');
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/getResume/', function(req, res) {
    User.findById(req.query.search_id, function(err, user) {
        return res.render('resume', {
            title: "Resume",
            users: user,
            search_id: req.query.search_id
        });
    })

})

app.post('/', function(req, res) {

    var action = req.body.queryResult.action;
    console.log('action: ' + action);
    if (action == "getName") {

        return (getname_controller.getName(req,res));
       

    } else if (action == "getEmail") {
        
        return (getemail_controller.getEmail(req,res));
       

    } else if (action == "getSkills") {

        return (getskills_controller.getSkills(req,res));

    } else if (action == "getInterest") {

        return (getinterests_controller.getInterests(req,res));

        
    } else if (action == "getEducation") {

        return (geteducation_controller.getEducation(req,res));
      

    } else if (action == "getProjects") {

        return (getprojects_controller.getProjects(req,res));

       

    } else if (action == "getExperience") {

        return (getexperience_controller.getExperience(req,res));

       

    } else if (action == "getAchievements") {

        return (getachievements_controller.getAchievements(req,res));
        

    } else if (action == "showResume") {

        return (showresume_controller.showResume(req,res));
        

    } else if (action == "showDetails") {

        return (showdetails_controller.showDetails(req,res));

        
    } else if (action == "updateResume") {

        return (updateresume_controller.updateResume(req,res));
       


    } else if (action == "modifyAction") {

        return (modifyaction_controller.modifyAction(req,res));
        
    } else if (action == "getIndex") {

        return (getindex_controller.getIndex(req,res));
      
    } else if (action == "getJobBySkill") {

        return (getjobbyskill_controller.getJobBySkill(req,res));
       
    }
});
app.listen(port, function(err) {
    if (err) {
        console.log("Error in running server");
    }
    console.log("server started");
});