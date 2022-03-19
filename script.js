const wordGuessForm = document.getElementById('input');
const wordGuessField = document.getElementById('guess');

const randomWordIndex = Math.floor(Math.random() * validWords.length);
const randomWord = validWords[randomWordIndex];

let guessNr = 0;
let currentGuess = [];
const currentRow = document.querySelectorAll(`#row-${guessNr} >.box`);

//wordGuessForm.addEventListener('submit', (e) => {
//  e.preventDefault();
//  const wordGuess = wordGuessField.value;

//  for (const index in rowBoxes) {
//    const rowBox = rowBoxes[index];
//    rowBox.textContent = wordGuess[index];

//    if (wordGuess[index] === randomWord[index]) {
//      rowBox.className = 'box correct-spot';
//    } else if (randomWord.includes(wordGuess[index])) {
//      rowBox.className = 'box wrong-spot';
//    }
//  }
//});

function updateRow(row, word) {
  row.forEach((letterBox, index) => {
    letterBox.textContent = word[index];
  });

  //	let index = word.length - 1;
  //  row[index].textContent = word[index];
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
            console.log(currentGuess);
            //submitGuess(currentGuess);
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
