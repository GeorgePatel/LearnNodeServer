const express = require("express");
const path = require("path");

const complements = [
    "You like nice today",
    "That dress looks nice on you",
    "Have you been working out?",
    "You can do hard things",
    "You've gotten far in this course. You're really smart",
    "You're programming! How cool is that?",
    "I'm really proud of you",
    "You made this",
    "You've learned a lot of things, and that's pretty hard to do"
];

const insults = [
    "You suck at programming",
    "Should've stuck to your previous job",
    "You only know Java lol",
    "Can you make a front end?",
    "Just because you learned DynamoDB doesn't mean you understand relational databases",
    "I bet you cannot make it in Software Development industry"
];


function getRandomComplement() {
    const randomIndex = Math.floor(Math.random() * complements.length);
    return complements[randomIndex];
}

function getRandomInsult() {
    const randomIndex = Math.floor(Math.random() * insults.length);
    return insults[randomIndex];
}

const app = express();

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/complement", function(req, res) {
    res
        .json({
            complement: getRandomComplement()
        })
        .end();
});

app.get("/insult", function(req, res) {
    res
        .json({
            insult: getRandomInsult()
        })
        .end();
});

app.use("/public", express.static("./public"));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on http://localhost:${port}`);
