const wordGuessForm = document.getElementById('input');
const wordGuessField = document.getElementById('guess');

//const randomWordIndex = Math.floor(Math.random() * validWords.length);
//const randomWord = validWords[randomWordIndex];
const randomWord = 'HELLO';

const messageContainer = document.getElementById('message-container');
const messageHeader = document.getElementById('announce');
const messageSubText = document.getElementById('sub-text');
const messageParagraph = document.querySelector('#message-container > p');

messageContainer.addEventListener('click', (e) =>
  e.target.classList.add('hide')
);

let guessNr = 0;
let randomWordArray = randomWord.split('');
let currentGuess = [];
let previouslyUsedLetters = [];
let correctLetters = [];
let currentRow = document.querySelectorAll(`#row-${guessNr} .box`);

function updateRow(row, word) {
  row.forEach((letterBox, index) => {
    letterBox.textContent = word[index];
    letterBox.className = 'box typed';
  });
}

//function determineMissingLetters() {
//  guessedLetters.forEach((letter, index) => {
//    if (previouslyUsedLetters.includes(letter)) {
//      guessedLetters.splice(index, 1);
//    }
//  });

//  console.log(guessedLetters);
//}

//determineMissingLetters();

//function checkWordAndAddClasses(row, word) {
//  row.forEach((letterBox, index) => {
//    letterBox.textContent = word[index];

//    if (word[index] === randomWordArray[index]) {
//      correctLetters.push(word[index]);
//      letterBox.className = 'box correct-spot';
//      letterBox.parentElement.className = 'flip';
//    } else if (randomWordArray.includes(word[index]) ) {
//      correctLetters.push(word[index]);
//      letterBox.className = 'box wrong-spot';
//      letterBox.parentElement.className = 'flip';
//    } else {
//      letterBox.className = 'box not-in-word';
//      letterBox.parentElement.className = 'flip';
//    }
//  });

//  if (word.join('') === randomWord) displayMessage(true);
//  if (guessNr === 6) displayMessage(false);
//}

//LOLPO

function checkWordAndAddClasses(row, word) {
  row.forEach((letterBox, index) => {
    letterBox.className = 'box not-in-word';
    letterBox.parentElement.className = 'flip';
  });

  row.forEach((letterBox, index) => {
    letterBox.textContent = word[index];
    if (word[index] === randomWord[index]) {
      letterBox.className = 'box correct-spot';
      letterBox.parentElement.className = 'flip';
      randomWordArray.splice(index, 1, '');
    }
  });

  row.forEach((letterBox, index) => {
    letterBox.textContent = word[index];
    if (
      randomWordArray.includes(word[index]) &&
      word[index] !== randomWord[index]
    ) {
      correctLetters.push(word[index]);
      letterBox.className = 'box wrong-spot';
      letterBox.parentElement.className = 'flip';
      const letterIndex = randomWordArray.indexOf(word[index]);
      randomWordArray.splice(letterIndex, 1, '');
    }
  });

  if (word.join('') === randomWord) displayMessage(true);
  if (guessNr === 6) displayMessage(false);
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
      !correctLetters.includes(key.textContent)
    ) {
      key.classList.add('previously-typed');
    }
  });
}

const messageContent = {
  won: {
    header: 'Nice!',
    text: "You've guessed the word! Write a definition for it in the box below",
    textInputClass: 'show',
  },
  lost: {
    header: 'Bummer!',
    text: "Too bad you didn't get it!",
    textInputClass: 'hide',
  },
  wordExists: {
    header: 'Oh No!',
    text: 'This word actually exists! Made up words only!',
  },
};

function displayMessage(state) {
  messageHeader.textContent = messageContent[state].header;
  messageSubText.textContent = messageContent[state].text;

  messageContainer.classList.remove('hide');
}

const keyRows = {
  rowOne: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  rowTwo: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  rowThree: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  rowFour: ['GUESS WORD', 'Backspace'],
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
      keyButton.textContent = key;
      keyButton.addEventListener('click', (e) => {
        switch (e.target.textContent) {
          case 'Backspace':
            currentGuess.pop();
            updateRow(currentRow, currentGuess);
            break;
          case 'GUESS WORD':
            //checkIfValid();
            //if (!valid) break;
            if (currentGuess.length < 5) break;
            guessNr++;
            checkWordAndAddClasses(currentRow, currentGuess);
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
