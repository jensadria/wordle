const wordGuessForm = document.getElementById('input');
const wordGuessField = document.getElementById('guess');

const randomWordIndex = Math.floor(Math.random() * validWords.length);
const randomWord = validWords[randomWordIndex];

const messageContainer = document.getElementById('message-container');

messageContainer.addEventListener('click', (e) =>
  e.target.classList.add('hide')
);

let guessNr = 0;
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

console.log(
  randomWord.split('').forEach((letter) =>
    correctLetters.forEach((guessedLetter) => {
      if (guessedLetter === letter) {
        correctLetters.push(guessedLetter);
      }
    })
  )
);

function checkWordAndAddClasses(row, word) {
  row.forEach((letterBox, index) => {
    letterBox.textContent = word[index];

    if (word[index] === randomWord[index]) {
      correctLetters.push(word[index]);
      letterBox.className = 'box correct-spot';
      letterBox.parentElement.className = 'flip';
    } else if (randomWord.includes(word[index])) {
      correctLetters.push(word[index]);
      letterBox.className = 'box wrong-spot';
      letterBox.parentElement.className = 'flip';
    } else {
      letterBox.className = 'box not-in-word';
      letterBox.parentElement.className = 'flip';
    }
  });

  if (word.join('') === randomWord) displayMessage();
  if (guessNr === 6) displayMessage();
}

function goToNextRow() {
  currentRow = document.querySelectorAll(`#row-${guessNr} > div > .box `);
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

function displayMessage() {
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
