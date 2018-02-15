var Word = require("./Word");
var Letter = require("./Letter");
var inquirer = require('inquirer');
var wordBank = ["cat", "dog", "hamster", "snake", "parrot", "gerbil"];
var randomIndex = Math.floor(Math.random() * wordBank.length);
var randomWord = wordBank[randomIndex];
var newWord = new Word(randomWord);
var maxGuesses = 10;

var question =
  {
    type: 'input',
    name: 'enteredLetter',
    message: "Enter a letter",
    validate: function(value) {
      var pass = value.match(/^[A-Za-z]+$/);
      if (pass) {
        return true;
      }
      return 'Please enter letters only';
    }
  };

function start() {
// console.log(newWord + '');
console.log("Guess this word: ", newWord + '');
if (newWord.guessesMade.length >= maxGuesses) {
  console.log('You have no more guesses. TRY AGAIN!.');
return;
}
inquirer.prompt(question).then(function(answer) {
  var input = answer.enteredLetter.toLowerCase();
  newWord.checkAns(input);
  if (newWord.solved()) {
					console.log('YOU WIN! It was ' + newWord + '');
        } else {
          console.log('You have ' + (maxGuesses - newWord.guessesMade.length) + ' guesses left.')
          start();
        }
});
}

start();
