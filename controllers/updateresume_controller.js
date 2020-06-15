const User = require('../models/user');
module.exports.updateResume = function(req,res)
{
    var len = 0;
    var toSend = "";
    let field = req.body.queryResult.parameters["details"];
    let updateid = req.body.queryResult.parameters["id"];
    User.findOne({
        _id: updateid
    }, function(err, user) {
        if (err || user === null) {
            console.log("cant be found");
            toSend = "Invalid ID";
            return res.json(200, {
                "fulfillmentMessages": [{
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [{
                            "textToSpeech": [toSend]
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
        }
        console.log("found");
        if (field == "name") {
            toSend = user.name + " \n Want to change name?";
            return res.json(200, {
                "fulfillmentMessages": [{
                        "platform": "ACTIONS_ON_GOOGLE",
                        "simpleResponses": {
                            "simpleResponses": [{
                                "textToSpeech": [toSend]
                            }]
                        }
                    },
                    {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "suggestions": {
                            "suggestions": [{
                                "title": "change"
                            }, ]
                        }
                    }

                ],
                "outputContexts": [{
                        "name": req.body.session + "/contexts/updateid",
                        "lifespanCount": 5,
                        "parameters": {
                            "updateid": updateid
                        }
                    },
                    {
                        "name": req.body.session + "/contexts/field",
                        "lifespanCount": 5,
                        "parameters": {
                            "field": field
                        }
                    }

                ]
            });
        } else if (field == "email") {
            toSend = user.email + " \n Want to change email?";
            return res.json(200, {
                "fulfillmentMessages": [{
                        "platform": "ACTIONS_ON_GOOGLE",
                        "simpleResponses": {
                            "simpleResponses": [{
                                "textToSpeech": [toSend]
                            }]
                        }
                    },
                    {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "suggestions": {
                            "suggestions": [{
                                "title": "change "
                            }, ]
                        }
                    }
                ],

                "outputContexts": [{
                        "name": req.body.session + "/contexts/updateid",
                        "lifespanCount": 5,
                        "parameters": {
                            "updateid": updateid
                        }
                    },
                    {
                        "name": req.body.session + "/contexts/field",
                        "lifespanCount": 5,
                        "parameters": {
                            "field": field
                        }
                    }
                ]
            });
        } else if (field == "skills")
            toSend = user.skills + "\n Want to delete or add a new skill?";
        else if (field == "interests")
            toSend = user.interests + "\n Want to delete or add a new interest?";
        else if (field == "education") {
            toSend = "";
            len = user.education.length;
            for (i = 0; i < len; i++)
                toSend += (i + 1).toString() + ". Degree: " + String(user.education[i].degree) + " School Name: " + String(user.education[i].university_name) + " Location: " + String(user.education[i].location) + " Percentage: " + String(user.education[i].percentage) + "\n";
            toSend += "\n Want to delete or add a new education?";
        } else if (field == "projects") {
            toSend = "";
            len = user.project.length;
            for (i = 0; i < len; i++)
                toSend += (i + 1).toString() + ". Title: " + String(user.project[i].title) + " Year: " + String(user.project[i].year) + " Description: " + String(user.project[i].description) + "\n";
            toSend += "\n Want to delete or add a new project?";
        } else if (field == "experience") {
            toSend = "";
            len = user.experience.length;
            for (i = 0; i < len; i++)
                toSend += (i + 1).toString() + ". Position: " + String(user.experience[i].position) + " Company: " + String(user.experience[i].company_name) + " Location: " + String(user.experience[i].location) + " Duration: " + String(user.experience[i].duration) + "\n";
            toSend += "\n Want to delete or add a new experience?"
        } else if (field == "achievements"){
            toSend = "";
            len = user.achievements.length;
            for (i = 0; i < len; i++)
                toSend += (i + 1).toString() + ". " + String(user.achievements[i].achievement) + "\n";
            toSend += "\n Want to delete or add a new achievement?"
        }else
            toSend = "Not a valid query";

        return res.json(200, {
            "fulfillmentMessages": [{
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [{
                            "textToSpeech": [toSend]
                        }]
                    }
                },
                {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "suggestions": {
                        "suggestions": [{
                                "title": "add"
                            },
                            {
                                "title": "delete"
                            }
                        ]
                    }
                }
            ],
            "outputContexts": [{
                    "name": req.body.session + "/contexts/updateid",
                    "lifespanCount": 5,
                    "parameters": {
                        "updateid": updateid
                    }
                },
                {
                    "name": req.body.session + "/contexts/field",
                    "lifespanCount": 5,
                    "parameters": {
                        "field": field
                    }
                }
            ]

        });
    });
}