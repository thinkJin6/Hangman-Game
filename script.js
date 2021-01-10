const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong__letters');
const btnPlayAgain = document.getElementById('btn--play');
const popup = document.getElementById('popup__container');
const notification = document.getElementById('notification__container');
const finalMessage = document.getElementById('final__message');
const figureParts = document.querySelectorAll('.figure__part');

const words = [
  'sex',
  'chihuahua',
  'protein',
  'instagram',
  'programming',
  'cheif',
  'notification',
  'message',
  'wizard',
];

let selectedWord = words[Math.trunc(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show the hidden word
const displayWord = function () {
  wordEl.innerHTML = `
        ${selectedWord
          .split('')
          .map(
            (letter) => `
             <span class="letter">${
               correctLetters.includes(letter) ? letter : ''
             }</span> 
        `
          )
          .join('')}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulation! You won! 🎉';
    popup.style.display = 'flex';
  }
};

// Update the wrong letter
const updateWrongLetterEl = function () {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
         ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
         ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  // Display figures's parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    index < errors
      ? (part.style.display = 'block')
      : (part.style.display = 'none');
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 🙁';
    popup.style.display = 'flex';
  }
};

// Show notification
const showNotification = function () {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
};

const pushLetterIntoArr = function (letter) {
  if (selectedWord.includes(letter) && !correctLetters.includes(letter)) {
    correctLetters.push(letter);
    displayWord();
  } else {
    showNotification();
  }

  if (!selectedWord.includes(letter) && !wrongLetters.includes(letter)) {
    wrongLetters.push(letter);
    updateWrongLetterEl();
  } else {
    showNotification();
  }
};

// Key down letter press
window.addEventListener('keydown', function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    pushLetterIntoArr(letter);
  }
});

// Restart game and play again
btnPlayAgain.addEventListener('click', function () {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.trunc(Math.random() * words.length)];

  displayWord();

  updateWrongLetterEl();

  popup.style.display = 'none';
});

displayWord();
