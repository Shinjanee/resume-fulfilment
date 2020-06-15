const User = require('../models/user');
module.exports.getExperience = function(req,res)
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

    let experienceArray = [];
    var position = req.body.queryResult.parameters["position"];
    var duration = req.body.queryResult.parameters["duration"];
    var location = req.body.queryResult.parameters["city"];
    var company_name = req.body.queryResult.parameters["company_name"];
    experienceArray.push({
        "position": position,
        "duration": duration,
        "location": location,
        "company_name": company_name
    });

    User.findOne({
        _id: id
    }, function(err, user) {
        if (err) {
            console.log("cant be updated");
            return;
        }
        User.findByIdAndUpdate(id, {
            $push: {
                experience: experienceArray
            }
        }, function(err, user) {
            if (err) {
                console.log("cant be updated");
                return;
            }
            console.log("updated");
        });
        if (flag == "create") {
            nextRes = "Do you want to enter more?";
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
                                    "title": "yes"
                                },
                                {
                                    "title": "no"
                                }
                            ]
                        }
                    }
                ]
            });
        } else {
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
              }]
            });
        }
    });
}