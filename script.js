const wordGuessForm = document.getElementById('input');
const wordGuessField = document.getElementById('guess');
let wordsFromLocalStorage = fetchExistingWords();
const stats = fetchStats();

const wordsCombined = [...validWords, ...madeUpWords];
const randomWordIndex = Math.floor(Math.random() * wordsCombined.length);
const randomWord = wordsCombined[randomWordIndex];
//const randomWord = 'HELLO';
const randomWordArray = randomWord.split('');

const messageContainer = document.getElementById('message-container');
const messageHeader = document.getElementById('announce');
const messageSubText = document.getElementById('sub-text');
const messageParagraph = document.querySelector('#message-container p');
const messageForm = document.querySelector('#message-container form');
const messageWord = document.querySelector('#message-container #the-word');
const messageConfirmation = document.querySelector('#confirmation-message');
const modalButtons = document.querySelector('#modal-buttons');

const wordsList = document.getElementById('words-list');

const instructionsContainer = document.getElementById('instructions-container');
const instructions = document.getElementById('instructions');

// EVENT LISTENERS

document
  .querySelectorAll('.container')
  .forEach((item) =>
    item.addEventListener('click', (e) => e.target.classList.add('hide'))
  );

//function closeContainer(e) {
//  e.classList.add('hide');
//}

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

function checkWordMatch(guessedWordArray, answerWord) {
  const answerWordArray = answerWord.split('');
  const guessedWordArrayCopy = [...guessedWordArray];
  const guessedWordArrayObject = guessedWordArray.map((lttr) => {
    return { letter: lttr, match: null };
  });

  for (let index = 0; index < answerWordArray.length; index++) {
    if (answerWordArray[index] === guessedWordArrayCopy[index]) {
      guessedWordArrayObject[index].match = 'exact';
      answerWordArray.splice(index, 1, '');
      guessedWordArrayCopy.splice(index, 1, '');
    }
  }

  for (let index = 0; index < answerWordArray.length; index++) {
    if (
      answerWordArray.includes(guessedWordArrayCopy[index]) &&
      answerWordArray[index] !== guessedWordArrayCopy[index]
    ) {
      guessedWordArrayObject[index].match = 'part';
      let partMatchIndex = answerWordArray.indexOf(guessedWordArrayCopy[index]);
      answerWordArray.splice(partMatchIndex, 1, '');
      guessedWordArrayCopy.splice(partMatchIndex, 1, '');
    }
  }

  return guessedWordArrayObject;
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
  if (currentGuess.join('') === randomWord) {
    gameResult = 'won';
  }
  if (guessNr === 6) gameResult = 'lost';
  if (gameResult !== null) endGame(gameResult);
}

function endGame(result) {
  displayMessage(result);
  gameOver = true;
  updateStats(gameResult);
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
    text: "You've guessed the word! Write a definition for it in the box below. We know a guy who works for Merriam Webster and he said he'll add the word. Why would he lie",
    textInputClass: 'show-form',
    buttonsClass: '',
  },
  lost: {
    header: 'Bummer!',
    text: "Too bad you didn't get it! The word",
    textInputClass: 'hide-form',
    buttonsClass: 'hide-buttons',
  },
  wordExists: {
    header: 'Oh No!',
    text: 'This word actually exists! Made up words only!',
    textInputClass: 'hide-form',
    buttonsClass: 'hide-buttons',
  },
};

function displayMessage(result) {
  messageHeader.textContent = messageContent[result].header;
  messageSubText.textContent = messageContent[result].text;
  messageWord.textContent = randomWord;
  messageForm.className = messageContent[result].textInputClass;

  modalButtons.className = messageContent[result].buttonsClass;
  messageContainer.classList.remove('hide');
}

function display(modal) {
  const modalToOpen = document.getElementById(`${modal}-container`);
  modalToOpen.classList.remove('hide');
}

function addStatsToModal() {
  const statsModal = document.querySelector('#stats-details');

  statsModal.innerHTML = `
  <p>Played - ${stats.played}</p>  
  <p>Won - ${stats.wins}</p>  
  <p>Percentage - ${(stats.wins / stats.played) * 100}</p>  
  <p>Current Streak - ${stats.streak}</p>  
  `;
}

function addWordsToDictionaryModal() {
  wordsFromLocalStorage.forEach((word) => {
    //wordsList.textContent = '';

    const wordContainer = document.createElement('div');
    wordContainer.className = 'dict-word';

    wordContainer.innerHTML = `
		<h3>${word.word}</h3>
		<p>${word.definition}</p>
	`;

    wordsList.append(wordContainer);
  });
}

function submitWord() {
  const def = document.getElementById('word-definition').value;
  const wordToSave = { word: randomWord, definition: def };

  //Check if already exists
  const alreadyExists = wordsFromLocalStorage
    .map((word) => word.word)
    .includes(randomWord);

  wordsFromLocalStorage.push(wordToSave);

  if (def === 0) {
    displayConfirmation('Please type in a definition for the word');
    return;
  } else if (alreadyExists) {
    displayConfirmation('You already have a definition for this word!');
    return;
  } else {
    displayConfirmation('The word has been submitted to the dictionary!');
  }

  localStorage.setItem('words', JSON.stringify(wordsFromLocalStorage));

  addWordsToDictionaryModal();
}

function displayConfirmation(message) {
  messageConfirmation.innerText = `${message}`;

  setTimeout(() => (messageConfirmation.innerText = ''), 2000);
}

function fetchExistingWords() {
  const fetchedWords =
    localStorage.getItem('words') === null
      ? []
      : JSON.parse(localStorage.getItem('words'));

  return fetchedWords;
}

function fetchStats() {
  const fetchedStats =
    localStorage.getItem('stats') === null
      ? {
          played: 0,
          wins: 0,
          percentage: (this.wins / this.played) * 100,
          streak: 0,
        }
      : JSON.parse(localStorage.getItem('stats'));

  return fetchedStats;
}

function updateStats(result) {
  stats.played++;

  if (result === 'won') {
    stats.wins++, stats.streak++;
  } else if (result === 'lost') {
    stats.streak = 0;
  }

  localStorage.setItem('stats', JSON.stringify(stats));
  addStatsToModal();
}

function toggleDarkMode(e) {
  const darkModeSpan = document.querySelector('#dark-mode-span');

  if (document.body.dataset['theme'] === 'dark') {
    document.body.removeAttribute('data-theme');
    darkModeSpan.innerHTML = `<i class="fa-solid fa-moon fa-2x" onclick="toggleDarkMode(this)"></i>`;
  } else {
    document.body.setAttribute('data-theme', 'dark');
    darkModeSpan.innerHTML = `<i class="fa-solid fa-sun fa-2x" onclick="toggleDarkMode(this)"></i>`;
  }
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
        if (gameOver) return;
        switch (e.target.innerHTML) {
          case '<i class="fa-solid fa-delete-left"></i>':
            currentGuess.pop();
            updateRow(currentRow, currentGuess);
            break;
          case 'Enter':
            checkStatus();
            //checkIfValid();
            //if (!valid) break;
            if (currentGuess.length < 5) break;
            guessNr++;
            const matchResult = checkWordMatch(currentGuess, randomWord);
            addClassesToBox(currentRow, matchResult);
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

// Copied from MDN docs
function setClipboard(text) {
  var type = 'text/plain';
  var blob = new Blob([text], { type });
  var data = [new ClipboardItem({ [type]: blob })];

  navigator.clipboard.write(data);
}

function copyWordToClipBoard() {
  const definition = document.getElementById('word-definition').value;
  const textToShare = `I created a new word in WHAT?LE!!! \nTHe word is ${randomWord} and it means "${definition}".`;

  displayConfirmation('The word has been copied to your clipboard!');

  setClipboard(textToShare);
}

displayKeys(keyRows);
addWordsToDictionaryModal();
addStatsToModal();
