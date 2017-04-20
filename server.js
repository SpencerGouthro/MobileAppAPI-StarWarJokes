var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var Joke     	=   require("./models/joke");
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.route("/jokes")
    .get(function(req, res){
        // Display all jokes
        var response = {};
        Joke.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req, res){
        // Create a joke
        var newJokeModel = new Joke();
        var response = {};
        newJokeModel.jokelead = req.body.jokelead;
        newJokeModel.punchline = req.body.punchline;                
        newJokeModel.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

router.route("/jokes/:id")
    .get(function(req, res){
        // Display individual joke
        var response = {};
        Joke.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .delete(function(req, res){
        // Delete Joke
        var response = {};
        Joke.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                Joke.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    });

app.use('/', router);

app.listen(1234);
console.log("Listening to port 1234");