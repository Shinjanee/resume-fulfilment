const User = require('../models/user');
module.exports.showDetails = function(req,res)
{
    var tokenId = req.body.queryResult.parameters["id"];
        console.log(tokenId);
        var details = req.body.queryResult.parameters["details"];
        User.findOne({
            _id: tokenId
        }, function(err, user) {
            var result = "";
            if (err || user === null) {
                result = "Invalid ID";
                return res.json(200, {
                "fulfillmentMessages": [{
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [{
                            "textToSpeech": [result]
                        }]
                      }
                  },
                  {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "suggestions": {
                                "suggestions": [{
                                        "title": "go to main menu"
                                    }
                                ]
                            }
                        }
                    ]
              });
            } else {
                if (details == "name") {
                    result = "Name : " + user.name;
                }
                if (details == "skills") {
                    result = "Skills : " + user.skills;
                } else if (details == "interests") {
                    result = "Interests : " + user.interests;
                } else if (details == "email") {
                    result = "E-mail : " + user.email;
                } else if (details == "achievements") {
                    for (var i = 0; i < user.achievements.length; i++) {
                        result += String(i+1)+". " + user.achievements[i].achievement + "\n "
                    }
                } else if (details == "education") {
                    for (var i = 0; i < user.education.length; i++) {
                        result += String(i+1) + ". Degree: " + user.education[i].degree +
                            ", University Name: " + user.education[i].university_name +
                            ", Location: " + user.education[i].location + 
                            ", Percentage: " + user.education[i].percentage + "% \n "
                    }
                } else if (details == "experience") {
                    for (var i = 0; i < user.experience.length; i++) {
                        result += String(i+1) + ". Position: " + user.experience[i].position +
                            ", Duration: " + user.experience[i].duration +
                            ", Location: " + user.experience[i].location + 
                            ", Company Name: " + user.experience[i].company_name + "\n "
                    }

                } else if (details == "projects") {
                    for (var i = 0; i < user.project.length; i++) {
                        result += String(i+1) + ". Title: " + user.project[i].title + 
                            ", Description: " + user.project[i].description +
                            ", Year: " + user.project[i].year + "\n "
                    }
                }
            }
            return res.json(200, {
                "fulfillmentMessages": [{
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [{
                            "textToSpeech": [result]
                        }]
                    }
                }]
            });

        });

}