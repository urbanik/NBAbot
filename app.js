'use strict';
const Readline = require('readline');
const matcher = require('./matcher');
const accuweather = require('node-accuweather')()('CjqnHE4SMlX8DT5WpUFGd272SALquRea');
const chalk = require('chalk');
var unirest = require("unirest");
var req = unirest("GET", "https://free-nba.p.rapidapi.com/players");

const rl = Readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    terminal: false
});

console.log('Ask me some question please! For exit write bye/exit!');
console.log('I am NBA chatbot who gives informations about ACTUAL NBA players, I answer questions about their height, weight, position, team, conference, division... like this:');
console.log('How ' + chalk.red('tall ') + chalk.green('Lebron James') + ' is?');
console.log('What ' + chalk.red('weight ') + chalk.green('Lebron James') + ' has?');
console.log('Which ' + chalk.red('position ') + chalk.green('Lebron James') + ' plays?');
console.log('For which ' + chalk.red('team ') + chalk.green('Lebron James') + ' plays?');
console.log('In which ' + chalk.red('conference ') + chalk.green('Lebron James') + ' plays?');
console.log('Ask me for the NBA players info!');

rl.setPrompt('> ') ;
rl.prompt() ;

rl.on( 'line', reply => {
    matcher(reply, cb => {
        switch (cb.intent) {
            case 'Hello' :
                console.log(cb.entities.greeting + " ! How can I help you ?")
            case 'PlayerInfo' :
                req.query({
                    "page": "0",
                    "per_page": "25",
                    "search": cb.entities.player
                });
                req.headers({
                    "x-rapidapi-host": "free-nba.p.rapidapi.com",
                    "x-rapidapi-key": "e0406fbe8dmshb60550c3dccc877p101a60jsn453e3c6e32b2"
                });
                req.end(function (res) {
                    if (res.error) throw new Error(res.error);
                    var player = JSON.parse(res.raw_body);
                    switch(cb.entities.statistic) {
                        case "tall":
                            console.log(cb.entities.player + ' height is ' + player.data[0]['height_feet'] + ' feet and ' + player.data[0].height_inches + ' inches.');
                            break;
                        case "weight":
                            console.log(cb.entities.player + ' weight is ' + player.data[0]['weight_pounds'] + ' pounds.');
                            break;
                        case "position":
                            console.log(cb.entities.player + ' postion is ' + player.data[0]['position'] + '.');
                            break;
                        case "team":
                            console.log(cb.entities.player + ' plays for ' + player.data[0]['team']['full_name'] + ' in city of' + player.data[0]['team']['city'] + '.');
                            break;
                        case "conference":
                            console.log(cb.entities.player + ' plays for ' + player.data[0]['team']['full_name'] + ' in ' + player.data[0]['team']['conference'] + ' conference.');
                            break;
                        case "division":
                            console.log(cb.entities.player + ' plays for ' + player.data[0]['team']['full_name'] + ' in ' + player.data[0]['team']['division'] + ' division.');
                            break;
                        default:
                        console.log("I dont know answer for this question!");
                    }
                });

                break;
            case 'Exit' :
                console.log("Shutting down...")
                process.exit(0);
                break;
            default :
                console.log("Sorry. I dont understand! I am NBA bot!")
                break;
        }

    })
});

