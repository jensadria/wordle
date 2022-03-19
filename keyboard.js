const keyRows = {
  rowOne: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  rowTwo: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  rowThree: ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'CLEAR'],
  rowFour: [' '],
};

const keyRowsShift = {
  rowOne: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  rowTwo: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  rowThree: ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'CLEAR'],
  rowFour: [' '],
};

const output = document.getElementById('output');
const keyboard = document.querySelector('.keyboard');

displayKeys(keyRows);

let shiftMode = false;

function clearKeyboard() {
  keyboard.innerHTML = '';
}

function clearShiftMode() {
  if (shiftMode) {
    clearKeyboard();
    displayKeys(keyRows);
    shiftMode = !shiftMode;
  }
}

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
      keyButton.addEventListener('click', function (e) {
        switch (e.target.textContent) {
          case 'Backspace':
            output.textContent = output.textContent.slice(
              0,
              output.textContent.length - 1
            );
            break;
          case 'CLEAR':
            output.textContent = '';
            break;
          case 'Shift':
            clearKeyboard();
            shiftMode ? displayKeys(keyRows) : displayKeys(keyRowsShift);
            shiftMode = !shiftMode;
            break;
          default:
            output.textContent += e.target.textContent;
            clearShiftMode();
        }
      });
      rowElement.appendChild(keyButton);
    }
  }
}
