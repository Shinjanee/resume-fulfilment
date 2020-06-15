const https = require('https');
module.exports.getJobBySkill = function(req,res)
{
    var skill = req.body.queryResult.parameters["skill_name"];

    https.get("https://jobs.github.com/positions.json?description=" + skill + "&location=new+york", (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {

            var jobsArray = JSON.parse(data);
            var result = "";
            for (var i = 0; i < jobsArray.length; i++) {
                result += (i + 1).toString() + jobsArray[i].title + " and " + jobsArray[i].url + "  \n";
            }
            var toSend = result + " Want to create resume?";
            return res.json(200, {
                "fulfillmentMessages": [{
                        "platform": "ACTIONS_ON_GOOGLE",
                        "simpleResponses": {
                            "simpleResponses": [{
                                "textToSpeech": [String(toSend)]
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



        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    
}