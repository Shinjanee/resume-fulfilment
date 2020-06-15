const User = require('../models/user');
module.exports.modifyAction = function(req,res)
{
    let flag, field;
        var toSend = "";
        let contexts = req.body.queryResult.outputContexts;
        console.log(contexts);
        for (let i = 0; i < contexts.length; i++) {
            var context = contexts[i];
            if (context.name.endsWith('field')) {
                field = context.parameters.field;
                break;
            }
        }
        var val = req.body.queryResult.queryText;
        if (val == "add" || val == "change") {
            flag = "add";
            if (field == "skills") {
                toSend = "Please enter new skill";
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
                                        "title": "C"
                                    },
                                    {
                                        "title": "C++"
                                    },
                                    {
                                        "title": "App Development"
                                    },
                                    {
                                        "title": "Web Development"
                                    },
                                    {
                                        "title": "Node Js"
                                    },
                                    {
                                        "title": "Javascript"
                                    },
                                    {
                                        "title": "Java"
                                    },
                                    {
                                        "title": "Git"
                                    },
                                    {
                                        "title": "Machine Learning"
                                    },
                                    {
                                        "title": "Internet of Things"
                                    },
                                    {
                                        "title": "Python"
                                    },
                                    {
                                        "title": "Data Science"
                                    },
                                    {
                                        "title": "Databases"
                                    },
                                    {
                                        "title": "Cloud"
                                    }
                                ]
                            }
                        }
                    ],
                    "outputContexts": [{
                        "name": req.body.session + "/contexts/flag",
                        "lifespanCount": 5,
                        "parameters": {
                            "flag": flag
                        }
                    }]

                });
            } else if (field == "interests") {
                toSend = "Please enter new interest";
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
                                        "title": "Travelling"
                                    },
                                    {
                                        "title": "Chess"
                                    },
                                    {
                                        "title": "Reading Books"
                                    },
                                    {
                                        "title": "Swimming"
                                    },
                                    {
                                        "title": "Music"
                                    },
                                    {
                                        "title": "Dancing"
                                    },
                                    {
                                        "title": "Coding"
                                    },
                                    {
                                        "title": "Sports"
                                    },
                                    {
                                        "title": "Writing Blogs"
                                    },
                                    {
                                        "title": "Cooking"
                                    }
                                ]
                            }
                        }
                    ],

                    "outputContexts": [{
                        "name": req.body.session + "/contexts/flag",
                        "lifespanCount": 5,
                        "parameters": {
                            "flag": flag
                        }
                    }]
                });
            } else
                toSend = "Please enter new " + field;
        } else if (val == "delete") {
            flag = "delete";
            if (field == "skills") {
                toSend = "Please enter skill to be deleted";

            } else if (field == "interests") {
                toSend = "Please enter interest to be deleted";

            } else if (field == "achievements") {
                toSend = "Please enter record index to be deleted";
            } else if (field == "education") {
                toSend = "Please enter record index to be deleted";

            } else if (field == "projects") {
                toSend = "Please enter record index to be deleted";

            } else if (field == "experience") {
                toSend = "Please enter record index to be deleted";

            }
        } else
            toSend = "Invalid Request";
        return res.json(200, {
            "fulfillmentMessages": [{
                "platform": "ACTIONS_ON_GOOGLE",
                "simpleResponses": {
                    "simpleResponses": [{
                        "textToSpeech": [toSend]
                    }]
                }
            }],
            "outputContexts": [{
                "name": req.body.session + "/contexts/flag",
                "lifespanCount": 5,
                "parameters": {
                    "flag": flag
                }
            }]
        });
}