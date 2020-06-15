const User = require('../models/user');
module.exports.showResume =  function(req,res)
{
        let nextRes;
        let search_id = req.body.queryResult.parameters["id"];
        User.findOne({
            _id: search_id
        }, function(err, user) {
            if (err || user === null) {
                console.log("cant be updated");
                nextRes = "Invalid ID";
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
                                        "title": "go to main menu"
                                    }
                                ]
                            }
                        }
                    ]
              });
            } else {
                nextRes = "You can access your resume at this URL : http://resume-fulfilment1.herokuapp.com/getResume/?search_id=" + String(search_id);

            }
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