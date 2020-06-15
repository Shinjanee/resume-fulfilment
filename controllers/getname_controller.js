const User = require('../models/user');
module.exports.getName = function(req,res)
{
    let nextRes, query;
        var name = req.body.queryResult.parameters["namelist"]["given-name"];
        if (name === undefined)
            query = req.body.queryResult.parameters["namelist"];
        else
            query = req.body.queryResult.parameters["namelist"]["given-name"];
        let flag;
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
        if (flag == "add") {
            let id;
            let contexts = req.body.queryResult.outputContexts;
            console.log(contexts);
            for (let i = 0; i < contexts.length; i++) {
                var context = contexts[i];
                if (context.name.endsWith('updateid')) {
                    id = context.parameters.updateid;
                    break;
                }
            }
            console.log(id);
            User.findByIdAndUpdate(id, {
                "name": query
            }, function(err, user) {
                if (err) {
                    console.log("cant be updated");
                    return;
                }
                console.log("updated");
            });
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

        } else {
            console.log(query);
            User.create({
                name: query,
                email: " ",
                education: [],
                experience: [],
                project: [],
                skills: " ",
                interests: " ",
                achievements: " "
            }, function(err, user) {

                if (err) {
                    console.log("Error");
                    return;
                }
                console.log(" user created \n");
                var id = user._id;
                console.log(id);
                nextRes = "Please enter email";
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
                            "name": req.body.session + "/contexts/id",
                            "lifespanCount": 5,
                            "parameters": {
                                "id": JSON.stringify(id)
                            }
                        },
                        {
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



}