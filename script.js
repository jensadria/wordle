const wordGuessForm = document.getElementById('input');
const wordGuessField = document.getElementById('guess');

const randomWordIndex = Math.floor(Math.random() * validWords.length);
const randomWord = validWords[randomWordIndex];
const randomWordArray = randomWord.split('');

const messageContainer = document.getElementById('message-container');
const messageHeader = document.getElementById('announce');
const messageSubText = document.getElementById('sub-text');
const messageParagraph = document.querySelector('#message-container p');
const messageForm = document.querySelector('#message-container form');
const messageWord = document.querySelector('#message-container #the-word');

messageContainer.addEventListener('click', (e) =>
  e.target.classList.add('hide')
);

let guessNr = 0;
let currentGuess = [];
let previouslyUsedLetters = [];
let correctLetters = [];
let gameOver = false;
let gameResult = null;
let currentRow = document.querySelectorAll(`#row-${guessNr} .box`);

function updateRow(row, word) {
  row.forEach((letterBox, index) => {
    letterBox.textContent = word[index];
    letterBox.className = 'box typed';
  });
}

//const randomWordArrayObjects = randomWord.split('').map((lttr) => {
//  return { letter: lttr, color: null };
//});
//console.log(randomWordArrayObjects.map((obj) => obj.letter));

//function checkWordAndAddClasses(row, word) {
//  let randomWordArray = randomWord.split('');

//  row.forEach((letterBox, index) => {
//    letterBox.className = 'box not-in-word';
//    letterBox.parentElement.className = 'flip';
//  });

//  row.forEach((letterBox, index) => {
//    letterBox.textContent = word[index];
//    if (word[index] === randomWord[index]) {
//      correctLetters.push(word[index]);
//      letterBox.className = 'box correct-spot';
//      letterBox.parentElement.className = 'flip';
//      randomWordArray.splice(index, 1, '');
//    }
//  });

//  row.forEach((letterBox, index) => {
//    letterBox.textContent = word[index];
//    if (
//      randomWordArray.includes(word[index]) &&
//      word[index] !== randomWord[index]
//    ) {
//      correctLetters.push(word[index]);
//      letterBox.className = 'box wrong-spot';
//      letterBox.parentElement.className = 'flip';
//      const letterIndex = randomWordArray.indexOf(word[index]);
//      randomWordArray.splice(letterIndex, 1, '');
//    }
//  });

//if (word.join('') === randomWord) gameResult = 'won';
//if (guessNr === 6) gameResult = 'lost';

//console.log(gameResult);

//if (gameResult !== null) endGame(gameResult);
//}

function checkWord(guessedWord, answerWord) {
  const answerWordArray = answerWord.split('');
  const answerWordArrayObject = answerWordArray.map((lttr) => {
    return { letter: lttr, match: null };
  });

  answerWordArray.forEach((letter, index) => {
    if (guessedWord[index] === answerWord[index]) {
      answerWordArrayObject[index].match = 'exact';
    }
  });

  answerWordArray.forEach((letter, index) => {
    if (
      answerWordArray.includes(guessedWord[index]) &&
      guessedWord[index] !== answerWord[index]
    ) {
      answerWordArrayObject[index].match = 'part';
    }
  });

  return answerWordArrayObject;
}

function addClassesToBox(row, matchResult) {
  row.forEach((letterBox, index) => {
    if (matchResult[index].match === null)
      letterBox.className = 'box not-in-word';
    if (matchResult[index].match === 'exact')
      letterBox.className = 'box correct-spot';
    if (matchResult[index].match === 'part')
      letterBox.className = 'box wrong-spot';

    letterBox.parentElement.className = 'flip';
  });
}

function checkStatus() {
  if (currentGuess.join('') === randomWord) gameResult = 'won';
  if (guessNr === 6) gameResult = 'lost';
  if (gameResult !== null) endGame(gameResult);
}

function endGame(result) {
  displayMessage(result);
  gameOver = true;
}

function goToNextRow() {
  currentRow = document.querySelectorAll(`#row-${guessNr} > div > .box`);
  previouslyUsedLetters.push(...currentGuess);
  currentGuess = [];
  updateKeys();
}

function updateKeys() {
  const allKeys = document.querySelectorAll('.key');
  allKeys.forEach((key) => {
    if (
      previouslyUsedLetters.includes(key.textContent) &&
      !randomWordArray.includes(key.textContent)
    ) {
      key.classList.add('previously-typed');
    }
  });
}

const messageContent = {
  won: {
    header: 'Nice!',
    text: "You've guessed the word! Write a definition for it in the box below",
    textInputClass: 'show-form',
  },
  lost: {
    header: 'Bummer!',
    text: "Too bad you didn't get it! The word",
    textInputClass: 'hide-form',
  },
  wordExists: {
    header: 'Oh No!',
    text: 'This word actually exists! Made up words only!',
    textInputClass: 'hide-form',
  },
};

function displayMessage(result) {
  messageHeader.textContent = messageContent[result].header;
  messageSubText.textContent = messageContent[result].text;
  messageForm.className = messageContent[result].textInputClass;
  messageWord.textContent = randomWord;

  messageContainer.classList.remove('hide');
}

const keyRows = {
  rowOne: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  rowTwo: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  rowThree: [
    'Enter',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<i class="fa-solid fa-delete-left"></i>',
  ],
  //  rowFour: [ ],
};
const keyboard = document.querySelector('.keyboard');

function displayKeys(rows) {
  for (keyRow in rows) {
    const index = Object.keys(rows).indexOf(keyRow);

    const rowElement = document.createElement('div');
    rowElement.className = 'keyrow';
    rowElement.id = 'keyrow-' + index;
    keyboard.appendChild(rowElement);

    for (const key of rows[keyRow]) {
      const keyButton = document.createElement('div');
      keyButton.className = 'key';
      keyButton.innerHTML = key;
      keyButton.addEventListener('click', (e) => {
        switch (e.target.innerHTML) {
          case '<i class="fa-solid fa-delete-left"></i>':
            currentGuess.pop();
            updateRow(currentRow, currentGuess);
            break;
          case 'Enter':
            //checkIfValid();
            //if (!valid) break;
            if (currentGuess.length < 5) break;
            guessNr++;
            //checkWordAndAddClasses(currentRow, currentGuess);
            const matchResult = checkWord(currentGuess, randomWord);
            addClassesToBox(currentRow, matchResult);
            checkStatus();
            goToNextRow();
            break;
          default:
            currentGuess.length < 5 && currentGuess.push(e.target.textContent);
            updateRow(currentRow, currentGuess);
        }
      });

      rowElement.appendChild(keyButton);
    }
  }
}

displayKeys(keyRows);
