const User = require('../models/user');
module.exports.submit = function(req,res)
{
    let id;
    let contexts = req.body.queryResult.outputContexts;
    for (let i = 0; i < contexts.length; i++) {
            var context = contexts[i];
            if (context.name.endsWith('id')) {
                id = JSON.parse(context.parameters.id);
                break;
            }
        }

    var nextRes = "Thank You! Your resume has been recorded. Please not your ID for accessing later. ID: " + id;
    return res.json(200, {
        "fulfillmentMessages": [{
            "platform": "ACTIONS_ON_GOOGLE",
                "simpleResponses": {
                    "simpleResponses": [{
                        "textToSpeech": [String(nextRes)]
                        }]
                    }
                }]
    });
}