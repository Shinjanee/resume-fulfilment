const User = require('../models/user');
module.exports.getEmail =  function(req,res)
{
    let flag, nextRes;
    let contexts = req.body.queryResult.outputContexts;
    console.log(contexts);
    for (let i = 0; i < contexts.length; i++) {
        var context = contexts[i];
        if (context.name.endsWith('flag')) {
            flag = context.parameters.flag;
            break;
        }
    }
    console.log(flag);
    let id;
    if (flag == "create") {

        let contexts = req.body.queryResult.outputContexts;
        for (let i = 0; i < contexts.length; i++) {
            var context = contexts[i];
            if (context.name.endsWith('id')) {
                id = JSON.parse(context.parameters.id);
                break;
            }
        }
    } else {
        let contexts = req.body.queryResult.outputContexts;
        for (let i = 0; i < contexts.length; i++) {
            var context = contexts[i];
            if (context.name.endsWith('updateid')) {
                id = context.parameters.updateid;
                break;
            }
        }


    }
    console.log(id);
    User.findByIdAndUpdate(id, {
        "email": req.body.queryResult.parameters["email"]
    }, function(err, user) {
        if (err) {
            console.log("cant be update");
            return;
        }
        console.log(id);
        console.log("updated");
        if (flag == "create") {
            nextRes = "Please enter skills";
            return res.json(200, {
                "fulfillmentMessages": [{
                        "platform": "ACTIONS_ON_GOOGLE",
                        "simpleResponses": {
                            "simpleResponses": [{
                                "textToSpeech": [nextRes]
                            }]
                        }
                    },
                    {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "suggestions": {
                            "suggestions": [{
                                    "title": "c"
                                },
                                {
                                    "title": "c++"
                                },
                                {
                                    "title": "app development"
                                },
                                {
                                    "title": "web development"
                                },
                                {
                                    "title": "nodeJs"
                                },
                                {
                                    "title": "javascript"
                                },
                                {
                                    "title": "java"
                                },
                                {
                                    "title": "git"
                                },
                                {
                                    "title": "machine learning"
                                },
                                {
                                    "title": "internet of things"
                                },
                                {
                                    "title": "python"
                                },
                                {
                                    "title": "data science"
                                },
                                {
                                    "title": "databases"
                                },
                                {
                                    "title": "cloud"
                                },
                                {
                                    "title": "blockchain"
                                }
                            ]
                        }
                    }
                ]
            });
        } else {
            nextRes = "Resume Updated";
        }
        return res.json(200, {
            "fulfillmentMessages": [{
                "platform": "ACTIONS_ON_GOOGLE",
                "simpleResponses": {
                    "simpleResponses": [{
                        "textToSpeech": [nextRes]
                    }]
                }
            }],
            "outputContexts": [{
                        "name": req.body.session + "/contexts/flag",
                        "lifespanCount": 5,
                        "parameters": {
                            "flag": "create"
                        }
                    }

                ]  
        });
    });



}