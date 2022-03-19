const wordGuessForm = document.getElementById('input');
const wordGuessField = document.getElementById('guess');

const randomWordIndex = Math.floor(Math.random() * validWords.length);
const randomWord = validWords[randomWordIndex];

console.log(randomWord);

let guessNr = 0;
let currentGuess = [];
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
      letterBox.className = 'box correct-spot';
    } else if (randomWord.includes(word[index])) {
      letterBox.className = 'box wrong-spot';
    } else {
      letterBox.className = 'box not-in-word';
    }
  });
}

function newGuessAndNextRow() {
  guessNr++;
  currentRow = document.querySelectorAll(`#row-${guessNr} >.box`);
  currentGuess = [];
}

const keyRows = {
  rowOne: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  rowTwo: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  rowThree: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  rowFour: ['Backspace', 'GUESS WORD'],
};

const keyboard = document.querySelector('.keyboard');

function displayKeys(rows) {
  for (keyRow in rows) {
    const index = Object.keys(rows).indexOf(keyRow);

    const rowElement = document.createElement('div');
    rowElement.className = 'keyrow';
    rowElement.id = 'keyrow-' + index;
    keyboard.appendChild(rowElement);

    for (key of rows[keyRow]) {
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
            if (currentGuess.length < 5) break;
            checkWordAndAddClasses(currentRow, currentGuess);
            newGuessAndNextRow();
            break;
          default:
            currentGuess.length < 5 && currentGuess.push(e.target.textContent);
            updateRow(currentRow, currentGuess);
            console.log(currentGuess);
        }
      });

      rowElement.appendChild(keyButton);
    }
  }
}

displayKeys(keyRows);
