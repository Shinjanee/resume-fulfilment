const express = require('express');
const port = process.env.PORT;
const app = express();
const mongoose = require("./config/mongoose");
const User = require('./models/user');
const https = require('https');
app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
var id; //user id and update id
var query = "";
var flag = "create";
var nextRes = "";
var field = ""; //update field
var search_id = ""; //getDetails id
var resume_id = "";
var educationArray = [];
var experienceArray = [];
var projectArray = [];

//Show resume of user with id = search_id from showResume
app.get('/getResume', function(req, res) {
    User.findOne({
        _id: resume_id
    }, function(err, user) {
        if (err) {
            console.log("User not found" + resume_id);
            return;
        }
        return res.render('resume', {
            title: "Resume",
            users: user
        });
    })
})

app.post('/', function(req, res) {
    var action = req.body.queryResult.action;
    if(action =="getName"){
      nextRes="";
      if(flag == "add")
      {
          query = req.body.queryResult.parameters["given-name"];
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
      }else{
        experienceArray=[];
        educationArray = [];
        projectArray=[];
        User.create({
            name:req.body.queryResult.parameters["given-name"],
            email:"N.A",
            education:[],
            experience:[],
            project:[],
            skills:"N.A",
            interests:"N.A",
            achievements:"N.A"  
          },function(err,user) {
              if(err)
              {
                  console.log("Error");
                  return;
              }
              else{
                console.log(" user created \n");
                id = user._id;
                console.log(id);
                nextRes= "Enter email";
              }
            });
          }
          return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [nextRes]
                        }
                      ]
                    }
                  }
                ]
            });
    }else if(action=="getEmail"){
      nextRes="";
      User.findByIdAndUpdate(id,{"email":req.body.queryResult.parameters["email"]},function(err,user)
          {
             if(err)
             {
               console.log("cant be update");
               return;
             }
             console.log(id);
             console.log("updated");
             nextRes = "Enter skills";
              if(flag == "add")
              {
                nextRes = "Resume Updated";
              }
              return res.json(200, {
                  "fulfillmentMessages": [
                    {
                      "platform": "ACTIONS_ON_GOOGLE",
                      "simpleResponses": {
                        "simpleResponses": [
                          {
                            "textToSpeech": [nextRes]
                          }
                        ]
                      }
                    }
                  ]
              });
          });
  } else if (action == "getSkills") {
        nextRes="";
        query="";
        console.log("length : " + String(user.skills).length)
        User.findOne({
            _id: id
        }, function(err, user) {
            if (err) {
                console.log("cant be updated");
                return;
            }
            if (flag == "create" || String(user.skills).length == 0)
                query = req.body.queryResult.queryText;
            else if (flag == "add" && String(user.skills).length != 0)
                query = user.skills + ", " + req.body.queryResult.queryText;
            else if (flag == "delete") {
                var main_str = user.skills;
                var str = req.body.queryResult.queryText;
                if(main_str.includes(", " + str))
                  query = main_str.replace(", " + str, "");
                else if(main_str.includes(str + ","))
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
            });
            if (flag == "create")
                nextRes = "Enter interests";
            else
                nextRes = "Your resume has been updated";
            return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [nextRes]
                        }
                      ]
                    }
                  }
                ]
            });
        });
    } else if (action == "getInterest") {
        query="";
        nextRes="";
        User.findOne({
            _id: id
        }, function(err, user) {
            if (err) {
                console.log("cant be updated");
                return;
            }
            if (flag == "create" || String(user.interest).length == 0)
                query = req.body.queryResult.queryText;
            else if (flag == "add" && String(user.interest).length != 0)
              query = user.interests + ", " + req.body.queryResult.queryText;
            else if (flag == "delete") {
                var main_str = user.interests;
                var str = req.body.queryResult.queryText;
                if(main_str.includes(", " + str))
                  query = main_str.replace(", " + str, "");
                else if(main_str.includes(str + ","))
                  query = main_str.replace(str + ",", "");
                else
                  query = main_str.replace(str, "");
            }
            User.findByIdAndUpdate(id, {
                "interests": query
            }, function(err, user) {
                if (err) {
                    console.log("cant be updated");
                    return;
                }
                console.log("updated");
            });
            if (flag == "create")
                nextRes = "Enter education";
            else
                nextRes = "Your resume has been updated";
            return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [nextRes]
                        }
                      ]
                    }
                  }
                ]
            });
        });
    } else if (action == "getEducation") {
        nextRes="";
        educationArray = [];
        var degree = req.body.queryResult.parameters["degree"];
        var university_name = req.body.queryResult.parameters["university_name"];
        var location = req.body.queryResult.parameters["city"];
        var percentage = req.body.queryResult.parameters["percentage"];
        educationArray.push({
            "degree": degree,
            "university_name": university_name,
            "location": location,
            "percentage": percentage
        });
        User.findByIdAndUpdate(id, {
            $push: {
                education: educationArray
            }
        }, function(err, user) {
            if (err) {
                console.log("cant be updated");
                return;
            }
            console.log("updated");
        });
        if (flag == "create")
            {
              nextRes = "Want to enter more?";
              return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [nextRes]
                        }
                      ]
                    }
                  },
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "suggestions": {
                      "suggestions": [
                        {
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
          }
        else{
            nextRes = "Your resume has been updated";
            return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [nextRes]
                        }
                      ]
                    }
                  },
                ]
            });
          }
    } else if (action == "getProjects") {
        nextRes="";
        projectArray = [];
        var title = req.body.queryResult.parameters["title"];
        var year = req.body.queryResult.parameters["year"];
        var description = req.body.queryResult.parameters["description"];
        projectArray.push({
            "title": title,
            "year": year,
            "description": description
        });
        User.findByIdAndUpdate(id, {
            $push: {
                project: projectArray
            }
        }, function(err, user) {
            if (err) {
                console.log("cant be updated");
                return;
            }
            console.log("updated");
        });
        if (flag == "create")
            {
              nextRes = "Want to enter more?";
              return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [nextRes]
                        }
                      ]
                    }
                  },
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "suggestions": {
                      "suggestions": [
                        {
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
          }
        else{
            nextRes = "Your resume has been updated";
            return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [nextRes]
                        }
                      ]
                    }
                  }
                ]
            });
          }
    } else if (action == "getExperience") {
        nextRes="";
        experienceArray = [];
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
        if (flag == "create")
            {
              nextRes = "Want to enter more?";
              return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [nextRes]
                        }
                      ]
                    }
                  },
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "suggestions": {
                      "suggestions": [
                        {
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
          }
        else{
            nextRes = "Your resume has been updated";
            return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [nextRes]
                        }
                      ]
                    }
                  }
                ]
            });
          }
    } else if (action == "getAchievements") {
        query="";
        nextRes="";
        User.findOne({
            _id: id
        }, function(err, user) {
            if (err) {
                console.log("cant be updated");
                return;
            }
            if (flag == "create" || String(user.achievements).length == 0)
                query = req.body.queryResult.queryText;
            else if (flag == "add" && String(user.achievements).length != 0)
                query = user.achievements + ", " + req.body.queryResult.queryText;
            else if (flag == "delete") {
                var main_str = user.achievements;
                var str = req.body.queryResult.queryText;
                if(main_str.includes(", " + str))
                  query = main_str.replace(", " + str, "");
                else if(main_str.includes(str + ","))
                  query = main_str.replace(str + ",", "");
                else
                  query = main_str.replace(str, "");
            }
            User.findByIdAndUpdate(id, {
                "achievements": query
            }, function(err, user) {
                if (err) {
                    console.log("cant be updated");
                    return;
                }
                console.log("updated");
            });
            if (flag == "create")
                nextRes = "Thank you! Your resume gas been recorded. Please note your id for accessing later. ID : " + id;
            else
                nextRes = "Your resume has been updated";
            return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [nextRes]
                        }
                      ]
                    }
                  }
                ]
            });
        });
    } else if (action == "getJobBySkill") {
        toSend="";
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
                    "fulfillmentMessages": [
                      {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "simpleResponses": {
                          "simpleResponses": [
                            {
                              "textToSpeech": [String(toSend)]
                            }
                          ]
                        }
                      },
                      {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "suggestions": {
                          "suggestions": [
                            {
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

    } else if (action == "showDetails") {
        var toSend = "";
        var len = 0;
        var val = req.body.queryResult.parameters["details"];
        var search_id = req.body.queryResult.parameters["id"];
        User.findOne({
            _id: search_id
        }, function(err, user) {
            if (err) {
                console.log("cant be found");
                toSend = "Enter a valid ID";
            }
            console.log("found");
            if (val == "name")
                toSend = user.name;
            else if (val == "email")
                toSend = user.email;
            else if (val == "skills")
                toSend = user.skills;
            else if (val == "interests")
                toSend = user.interests;
            else if (val == "education") {
                toSend = "";
                len = user.education.length;
                for (i = 0; i < len; i++)
                    toSend += (i + 1).toString() + " Degree: " + String(user.education[i].degree) + " School Name: " + String(user.education[i].university_name) + " Location: " + String(user.education[i].location) + " Percentage: " + String(user.education[i].percentage) + "\n";
            } else if (val == "projects") {
                toSend = "";
                len = user.project.length;
                for (i = 0; i < len; i++)
                    toSend += (i + 1).toString() + " Title: " + String(user.project[i].title) + " Year: " + String(user.project[i].year) + " Description: " + String(user.project[i].description) + "\n";
            } else if (val == "experience") {
                toSend = "";
                len = user.experience.length;
                for (i = 0; i < len; i++)
                    toSend += (i + 1).toString() + " Position: " + String(user.experience[i].position) + " Company: " + String(user.experience[i].company_name) + " Location: " + String(user.experience[i].location) + " Duration: " + String(user.experience[i].duration) + "\n";
            } else if (val == "achievements")
                toSend = user.achievements;
            else
                toSend = "Not a valid query";

            return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [toSend]
                        }
                      ]
                    }
                  }
                ]
            });
        });

    } else if (action == "updateResume") {
        var len = 0;
        var toSend = "";
        field = req.body.queryResult.parameters["details"];
        id = req.body.queryResult.parameters["id"];
        User.findOne({
            _id: id
        }, function(err, user) {
            if (err) {
                console.log("cant be found");
                return;
            }
            console.log("found");
            if (field == "name"){
                toSend = user.name + " \n Add new?";
                return res.json(200, {
                  "fulfillmentMessages": [
                    {
                      "platform": "ACTIONS_ON_GOOGLE",
                      "simpleResponses": {
                        "simpleResponses": [
                          {
                            "textToSpeech": [toSend]
                          }
                        ]
                      }
                    },
                    {
                      "platform": "ACTIONS_ON_GOOGLE",
                      "suggestions": {
                        "suggestions": [
                          {
                            "title": "add"
                          },
                        ]
                      }
                    }                 
                  ]
              });
            }
            else if (field == "email")
                {
                  toSend = user.email + " \n Add new?";
                    return res.json(200, {
                      "fulfillmentMessages": [
                        {
                          "platform": "ACTIONS_ON_GOOGLE",
                          "simpleResponses": {
                            "simpleResponses": [
                              {
                                "textToSpeech": [toSend]
                              }
                            ]
                          }
                        },
                        {
                          "platform": "ACTIONS_ON_GOOGLE",
                          "suggestions": {
                            "suggestions": [
                              {
                                "title": "add"
                              },
                            ]
                          }
                        }                 
                      ]
                  });
                }
            else if (field == "skills")
                toSend = user.skills + "\n Delete or add new?";
            else if (field == "interests")
                toSend = user.interests + "\n Delete or add new?";
            else if (field == "education") {
                toSend = "";
                len = user.education.length;
                for (i = 0; i < len; i++)
                    toSend += (i + 1).toString() + " Degree: " + String(user.education[i].degree) + " School Name: " + String(user.education[i].university_name) + " Location: " + String(user.education[i].location) + " Percentage: " + String(user.education[i].percentage) + "\n";
                toSend += "\n Delete some entry or add new?";
            } else if (field == "projects") {
                toSend = "";
                len = user.project.length;
                for (i = 0; i < len; i++)
                    toSend += (i + 1).toString() + " Title: " + String(user.project[i].title) + " Year: " + String(user.project[i].year) + " Description: " + String(user.project[i].description) + "\n";
                toSend += "\n Delete some entry or add new?";
            } else if (field == "experience") {
                toSend = "";
                len = user.experience.length;
                for (i = 0; i < len; i++)
                    toSend += (i + 1).toString() + " Position: " + String(user.experience[i].position) + " Company: " + String(user.experience[i].company_name) + " Location: " + String(user.experience[i].location) + " Duration: " + String(user.experience[i].duration) + "\n";
                toSend += "\n Delete some entry or add new?"
            } else if (field == "achievements")
                toSend = user.achievements + "\n Delete all or add new?";
            else
                toSend = "Not a valid query";

            return res.json(200, {
                "fulfillmentMessages": [
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                      "simpleResponses": [
                        {
                          "textToSpeech": [toSend]
                        }
                      ]
                    }
                  },
                  {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "suggestions": {
                      "suggestions": [
                        {
                          "title": "add"
                        },
                        {
                          "title": "delete"
                        }
                      ]
                    }
                  }                 
                ]
            });
        });

    } else if (action == "modifyAction") {
        var toSend = "";
        var val = req.body.queryResult.queryText;
        if (val == "add") {
            flag = "add";
            toSend = "Enter " + field;
        } else if (val == "delete") {
            flag = "delete";
            if (field == "skills") {
                toSend = "Enter skill to be deleted";
            } else if (field == "interests") {
                toSend = "Enter interest to be deleted";
            } else if (field == "achievements") {
                toSend = "Enter achievement to be deleted";
            } else if (field == "education") {
                toSend = "Enter record index to be deleted";

            } else if (field == "projects") {
                toSend = "Enter record index to be deleted";

            } else if (field == "experience") {
                toSend = "Enter record index to be deleted";

            }
        } else
            toSend = "Invalid Request";
        return res.json(200, {
            "fulfillmentMessages": [
              {
                "platform": "ACTIONS_ON_GOOGLE",
                "simpleResponses": {
                  "simpleResponses": [
                    {
                      "textToSpeech": [toSend]
                    }
                  ]
                }
              }
            ]
        });
    } else if (action == "getIndex") {
        nextRes="";
        var index = req.body.queryResult.parameters["number"];
        if (field == "education") {
            User.findOne({
                _id: id
            }, function(err, user) {
                if (err) {
                    console.log("cant be updated");
                    return;
                }
                var array = user.education;
                array.splice(index - 1, 1);
                User.findByIdAndUpdate(id, {
                    education: array
                }, function(err, user) {
                    if (err) {
                        console.log("cant be updated");
                        return;
                    }
                    console.log("updated");
                });
                nextRes = "Your resume has been updated";
            });
        } else if (field == "projects") {
            User.findOne({
                _id: id
            }, function(err, user) {
                if (err) {
                    console.log("cant be updated");
                    return;
                }
                var array = user.project;
                array.splice(index - 1, 1);
                User.findByIdAndUpdate(id, {
                    project: array
                }, function(err, user) {
                    if (err) {
                        console.log("cant be updated");
                        return;
                    }
                    console.log("updated");
                });
                nextRes = "Your resume has been updated";
            });
        } else if (field == "experience") {
            User.findOne({
                _id: id
            }, function(err, user) {
                if (err) {
                    console.log("cant be updated");
                    return;
                }
                var array = user.experience;
                array.splice(index - 1, 1);
                User.findByIdAndUpdate(id, {
                    experience: array
                }, function(err, user) {
                    if (err) {
                        console.log("cant be updated");
                        return;
                    }
                    console.log("updated");
                });
                nextRes = "Your resume has been updated";
            });
        }
        return res.json(200, {
            "fulfillmentMessages": [
              {
                "platform": "ACTIONS_ON_GOOGLE",
                "simpleResponses": {
                  "simpleResponses": [
                    {
                      "textToSpeech": [nextRes]
                    }
                  ]
                }
              }
            ]
        });
    } else if (action == "showResume") {
        resume_id = req.body.queryResult.parameters["id"];
        nextRes = "";
         User.findOne({
                    _id: resume_id
                }, function(err, user) {
                    if (err) {
                        console.log("cant be updated");
                        nextRes = "Enter a valid id";
                    }
                    else {
                        nextRes = "https://resume-fulfilment1.herokuapp.com/getResume";
                    }
                    return res.json(200, {
                      "fulfillmentMessages": [
                        {
                          "platform": "ACTIONS_ON_GOOGLE",
                          "simpleResponses": {
                            "simpleResponses": [
                              {
                                "textToSpeech": [nextRes]
                              }
                            ]
                          }
                        }
                      ]
                  });
          });
        
    }

});

app.listen(port, function(err) {
    if (err) {
        console.log("Error in running server");
    }
    console.log("server started");

});