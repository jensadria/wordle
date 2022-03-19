const wordGuessForm = document.getElementById('input');
const wordGuessField = document.getElementById('guess');

const randomWordIndex = Math.floor(Math.random() * validWords.length);
const randomWord = validWords[randomWordIndex];

const allRows = document.getElementsByClassName('row');
//const rows = document.querySelectorAll('.container > div');

let guessNr = 0;
let currentGuess = [];
const currentRow = document.querySelectorAll(`#row-${guessNr} >.box`);

wordGuessForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const wordGuess = wordGuessField.value;

  //  const rowBoxes = document.querySelectorAll('#row-1 >.box');

  for (const index in rowBoxes) {
    const rowBox = rowBoxes[index];
    rowBox.textContent = wordGuess[index];

    if (wordGuess[index] === randomWord[index]) {
      rowBox.className = 'box correct-spot';
    } else if (randomWord.includes(wordGuess[index])) {
      rowBox.className = 'box wrong-spot';
    }
  }
});

const keyRows = {
  rowOne: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  rowTwo: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  rowThree: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  rowFour: ['GUESS WORD'],
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
        currentGuess.length < 5 && currentGuess.push(e.target.textContent);
        insertLetterIntoBox(currentRow, currentGuess);
        console.log(currentGuess);
      });

      rowElement.appendChild(keyButton);
    }
  }
}

displayKeys(keyRows);

//function typeLetterIntoBox(letter, row) {
//  let index = 0;
//  console.log(letter);
//  console.log(row[0]);
//  row[index].textContent = letter;
//}

function insertLetterIntoBox(row, word) {
  console.log(row);
  console.log(word);
  let index = word.length - 1;
  console.log(index);
  row[index].textContent = word[index];
}
