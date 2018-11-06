import { playerTurn } from './client.js';

let xTurn = true;
let gameEnd = false;
let playMode = 'comp';
const id = Math.random();


// Selecting the game mode: you can play with computer or play with friend (via websocket)
const choosePlayMode = event => {
  playMode = event.target.value;
};

const drawInSquare = className => {
  const clickedSquare = document.getElementsByClassName(className)[0];
  if (clickedSquare.used || gameEnd) {
    return false;
  }

  const createdCrossIcon = document.createElement('i');
  createdCrossIcon.innerText = 'clear';
  createdCrossIcon.classList.add('material-icons');
  const crossIcon = createdCrossIcon;

  const createdZeroIcon = document.createElement('i');
  createdZeroIcon.innerText = 'panorama_fish_eye';
  createdZeroIcon.classList.add('material-icons');
  const zeroIcon = createdZeroIcon;

  clickedSquare.used = true;
  clickedSquare.value = xTurn ? 'X' : '0';
  const whoseTurnSymbol = xTurn ? crossIcon : zeroIcon;

  clickedSquare.innerHTML = '';
  clickedSquare.appendChild(whoseTurnSymbol);
  xTurn = !xTurn;
  let whoWins = isWinner();
  if (!whoWins && playMode === 'comp') {
    compTurn(zeroIcon);
    whoWins = isWinner();
  }

  if (!whoWins) return false;

  displayWinner(whoWins);
  displayScores(whoWins);
  gameEnd = true;
};

const displayWinner = whoWins => {
  const winner = document.getElementsByClassName('winner')[0];
  if (!whoWins) {
    return winner.innerText = '';
  }
  winner.innerText = `We have a winner! ${whoWins} wins!`;
};

const displayScores = whoWins => {
  const scoreElement = document.getElementsByClassName(`scores-${whoWins}`)[0].firstElementChild;
  let score = Number(scoreElement.innerText);
  score++;
  scoreElement.innerText = score;
};

const isWinner = () => {
  const squares = Array.from(document.getElementsByClassName('battlefield-square'));
  // checking first line
  if (squares[0].value === 'X' && squares[1].value === 'X' && squares[2].value === 'X') {
    return 'X';
  }

  if (squares[0].value === '0' && squares[1].value === '0' && squares[2].value === '0') {
    return 'O';
  }

  // checking second line
  if (squares[3].value === 'X' && squares[4].value === 'X' && squares[5].value === 'X') {
    return 'X';
  }

  if (squares[3].value === '0' && squares[4].value === '0' && squares[5].value === '0') {
    return 'O';
  }

  // checking third line
  if (squares[6].value === 'X' && squares[7].value === 'X' && squares[8].value === 'X') {
    return 'X';
  }

  if (squares[6].value === '0' && squares[7].value === '0' && squares[8].value === '0') {
    return 'O';
  }

  // checking left column
  if (squares[0].value === 'X' && squares[3].value === 'X' && squares[6].value === 'X') {
    return 'X';
  }

  if (squares[0].value === '0' && squares[3].value === '0' && squares[6].value === '0') {
    return 'O';
  }

  // checking central column
  if (squares[1].value === 'X' && squares[4].value === 'X' && squares[7].value === 'X') {
    return 'X';
  }

  if (squares[1].value === '0' && squares[4].value === '0' && squares[7].value === '0') {
    return 'O';
  }

  // checking right column
  if (squares[2].value === 'X' && squares[5].value === 'X' && squares[8].value === 'X') {
    return 'X';
  }

  if (squares[2].value === '0' && squares[5].value === '0' && squares[8].value === '0') {
    return 'O';
  }

  // checking diagonal top left -> bottom right
  if (squares[0].value === 'X' && squares[4].value === 'X' && squares[8].value === 'X') {
    return 'X';
  }

  if (squares[0].value === '0' && squares[4].value === '0' && squares[8].value === '0') {
    return 'O';
  }

  // checking diagonal top right -> bottom left
  if (squares[2].value === 'X' && squares[4].value === 'X' && squares[6].value === 'X') {
    return 'X';
  }

  if (squares[2].value === '0' && squares[4].value === '0' && squares[6].value === '0') {
    return 'O';
  }
  return false;
};

window.onload = () => {
  const squares = Array.from(document.getElementsByClassName('battlefield-square'));

  squares.forEach(element => {
    element.addEventListener('click', playerClick);
    // element.addEventListener('click', drawInSquare);
    document.getElementsByClassName('btn-new-game')[0].addEventListener('click', resetGame);
  });

  const radiobtns = document.getElementsByName('play-mode');
  radiobtns[0].addEventListener('click', choosePlayMode);
  radiobtns[1].addEventListener('click', choosePlayMode);

};

// Computer's logic

const compTurn = zeroIcon => {
  const squares = Array.from(document.getElementsByClassName('battlefield-square'));
  const notUsedSquares = squares.filter(el => !el.used);
  xTurn = !xTurn;

  if (notUsedSquares.length) {
    const randomNotUsedSquare = Math.floor(Math.random() * notUsedSquares.length);
    notUsedSquares[randomNotUsedSquare].innerHTML = '';
    notUsedSquares[randomNotUsedSquare].appendChild(zeroIcon);
    notUsedSquares[randomNotUsedSquare].used = true;
    notUsedSquares[randomNotUsedSquare].value = '0';
  }
};

// Restart the game

// eslint-disable-next-line no-unused-vars
const resetGame = () => {
  const squares = Array.from(document.getElementsByClassName('battlefield-square'));
  squares.forEach(square => {
    square.innerText = '';
    square.used = false;
    square.value = '';
  });
  gameEnd = false;
  xTurn = true;
  displayWinner();
};

// Play with friend

const playerClick = event => {
  console.log('playerclick');
  const clickedSquare = event.target.closest('div');
  if (clickedSquare.used || gameEnd) {
    return false;
  }
  // if we play with computer
  if (playMode === 'comp') return drawInSquare(clickedSquare.className);

  // if we play with friend
  const data = {
    className: clickedSquare.className,
    id
  }

  playerTurn(JSON.stringify(data));
}

// Styles
var dpt = window.devicePixelRatio;
var widthM = window.screen.width;
var widthH = window.screen.height;
if (widthM*dpt < 976) { document.write('<meta name="viewport" content="width=600, user-scalable=yes">');
}

export default drawInSquare;
