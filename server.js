var words = {
    "rainbow" : 5,
    "dog" : 4,
    "rabbit" : 10,
    "trash" : -5
}

console.log('server is starting');
const express = require('express');

var app = express();
var server = app.listen(3000, listening);
function listening() {
    console.log('listening..');
}

app.use(express.static('website'));

app.get('/search/:flower/:num', sendFlower);
function sendFlower(request, response){
    var data = request.params;
    var num = data.num;
    var reply = "";
    for (var i = 0; i < num; i++) {
        reply += "I love "+ data.flower +" too. "
    }

    response.send(reply);
}

app.get('/all', sendAll);
function sendAll(request, response){
    response.send(words);
}

app.get('/add/:word/:score', addWord);
function addWord(request, response){
    var data = request.params;
    var word = data.word;
    var score = Number(data.score);

    words[word] = score;

    var reply = {
        msg: "thanks for the word, man!"
    }

    response.send(reply);
}

app.get('/search/:word/', searchWord);
function searchWord(request, response){
    var word = request.params.word;
    var reply;

    if (words[word]) {
        reply = {
            status: "found",
            word: word,
            score: words[word]
        }
    } else {
        reply = {
            status: "not found",
            word: word
        }
    }
    response.send(reply);
}
