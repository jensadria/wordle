const wordGuessForm = document.getElementById('input');
const wordGuessField = document.getElementById('guess');

const randomWordIndex = Math.floor(Math.random() * validWords.length);
const randomWord = validWords[randomWordIndex];
console.log(randomWord);

const allRows = document.getElementsByClassName('row');

wordGuessForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const wordGuess = wordGuessField.value;

  const rowBoxes = document.querySelectorAll('#row-1 >.box');

  console.log(rowBoxes);

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
