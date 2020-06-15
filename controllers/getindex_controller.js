const User = require('../models/user');
module.exports.getIndex = function(req,res)
{
    var index = req.body.queryResult.parameters["number"];
    let id, nextRes, field;
    let contexts = req.body.queryResult.outputContexts;
    for (let i = 0; i < contexts.length; i++) {
        var context = contexts[i];
        if (context.name.endsWith('updateid')) {
            id = context.parameters.updateid;

        }
        if (context.name.endsWith('field')) {
            field = context.parameters.field;

        }
    }
    console.log(id);
    if (field == "education") {
        User.findOne({
            _id: id
        }, function(err, user) {
            if (err) {
                console.log("cant be updated");
                return;
            }
            var array = user.education;
            array.splice(index - 1, 1);
            User.findByIdAndUpdate(id, {
                education: array
            }, function(err, user) {
                if (err) {
                    console.log("cant be updated");
                    return;
                }
                console.log("updated");
            });
            nextRes = "Your resume has been updated";
            return res.json(200, {
                "fulfillmentMessages": [{
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [{
                            "textToSpeech": [nextRes]
                        }]
                    }
                }]
            });
        });
    } else if (field == "projects") {
        User.findOne({
            _id: id
        }, function(err, user) {
            if (err) {
                console.log("cant be updated");
                return;
            }
            var array = user.project;
            array.splice(index - 1, 1);
            User.findByIdAndUpdate(id, {
                project: array
            }, function(err, user) {
                if (err) {
                    console.log("cant be updated");
                    return;
                }
                console.log("updated");
            });
            nextRes = "Your resume has been updated";
            return res.json(200, {
                "fulfillmentMessages": [{
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [{
                            "textToSpeech": [nextRes]
                        }]
                    }
                }]
            });
        });
    } else if (field == "experience") {
        User.findOne({
            _id: id
        }, function(err, user) {
            if (err) {
                console.log("cant be updated");
                return;
            }
            var array = user.experience;
            array.splice(index - 1, 1);
            User.findByIdAndUpdate(id, {
                experience: array
            }, function(err, user) {
                if (err) {
                    console.log("cant be updated");
                    return;
                }
                console.log("updated");
            });
            nextRes = "Your resume has been updated";
            return res.json(200, {
                "fulfillmentMessages": [{
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [{
                            "textToSpeech": [nextRes]
                        }]
                    }
                }]
            });
        });
    }else if (field == "achievements") {
        User.findOne({
            _id: id
        }, function(err, user) {
            if (err) {
                console.log("cant be updated");
                return;
            }
            var array = user.achievements;
            array.splice(index - 1, 1);
            User.findByIdAndUpdate(id, {
                achievements: array
            }, function(err, user) {
                if (err) {
                    console.log("cant be updated");
                    return;
                }
                console.log("updated");
            });
            nextRes = "Your resume has been updated";
            return res.json(200, {
                "fulfillmentMessages": [{
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [{
                            "textToSpeech": [nextRes]
                        }]
                    }
                }]
            });
        });
    }
}