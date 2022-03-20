const wordGuessForm = document.getElementById('input');
const wordGuessField = document.getElementById('guess');

const randomWordIndex = Math.floor(Math.random() * validWords.length);
const randomWord = validWords[randomWordIndex];

let guessNr = 0;
let currentGuess = [];
let previouslyUsedLetters = [];
let correctLetters = [];
let currentRow = document.querySelectorAll(`#row-${guessNr} >.box`);

function updateRow(row, word) {
  row.forEach((letterBox, index) => {
    letterBox.textContent = word[index];
  });
}

function checkWordAndAddClasses(row, word) {
  row.forEach((letterBox, index) => {
    letterBox.textContent = word[index];

    if (word[index] === randomWord[index]) {
      correctLetters.push(word[index]);
      letterBox.className = 'box correct-spot';
    } else if (randomWord.includes(word[index])) {
      correctLetters.push(word[index]);
      letterBox.className = 'box wrong-spot';
    } else {
      letterBox.className = 'box not-in-word';
    }
  });
}

function newGuessAndNextRow() {
  guessNr++;
  currentRow = document.querySelectorAll(`#row-${guessNr} >.box >div`);
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
            checkWordAndAddClasses(currentRow, currentGuess);
            newGuessAndNextRow();
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
