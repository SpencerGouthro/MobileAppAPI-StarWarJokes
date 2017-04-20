var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/APIswJokes');

var mongoSchema =   mongoose.Schema;
var jokeSchema  = {
    "jokelead" : String,
    "punchline" : String
};

module.exports = mongoose.model('jokes', jokeSchema);