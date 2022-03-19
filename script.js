const wordGuessForm = document.getElementById('input');
const wordGuessField = document.getElementById('guess');

const randomWordIndex = Math.floor(Math.random() * validWords.length);
const randomWord = validWords[randomWordIndex];
console.log(randomWord);

const allRows = document.getElementsByClassName('row');

wordGuessForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const wordGuess = wordGuessField.value;
});
