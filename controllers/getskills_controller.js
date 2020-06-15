const User = require('../models/user');
module.exports.getSkills = function(req,res)
{
    let flag, nextRes, query;
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

    User.findOne({
        _id: id
    }, function(err, user) {
        if (err) {
            console.log("cant be updated");
            return;
        }
        if (flag == "create")
            query = req.body.queryResult.queryText;
        else if (flag == "add") {
            if (String(user.skills).length == 0)
                query = req.body.queryResult.queryText;
            else
                query = user.skills + "," + req.body.queryResult.queryText;
        } else if (flag == "delete") {
            var main_str = user.skills;
            var str = req.body.queryResult.queryText;
            if (main_str.includes("," + str))
                query = main_str.replace("," + str, "");
            else if (main_str.includes(str + ","))
                query = main_str.replace(str + ",", "");
            else
                query = main_str.replace(str, "");
        }
        User.findByIdAndUpdate(id, {
            "skills": query
        }, function(err, user) {
            if (err) {
                console.log("cant be updated");
                return;
            }
            console.log("updated");
            if (flag == "create") {
                nextRes = "Please enter interests";
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
                    ]
                });

            } else if (flag == "add")
                nextRes = "Resume Updated";
            else
                nextRes = "Resume Updated";
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
    });
}