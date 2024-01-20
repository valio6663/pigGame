'use strict';

//Selecting elements by ID not by class this is why we use #
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);
const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnPlayAgain = document.querySelector('.btn--new');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
current0El.textContent = 0;
current1El.textContent = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  //1. add currscore to the score of active player
  if (playing) {
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if score is already < 100
    if (scores[activePlayer] >= 100) {
      //3. finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      //4. switch to the next player
      switchPlayer();
    }
  }
});

btnPlayAgain.addEventListener(`click`, function () {
  playing = true;
  scores = [0, 0];
  console.log(scores[activePlayer]);

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  currentScore = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;

  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  activePlayer = 0;
});
