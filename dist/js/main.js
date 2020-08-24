const cells = document.querySelectorAll('.table__cell');
const turnVariations = ['current-x', 'current-zero'];
const table = document.querySelector('.table');
let currentTurn = turnVariations[Math.floor(Math.random() * turnVariations.length)];
const endGameMessageBlock = document.querySelector('.table__end-game-block');
const endGameText = document.querySelector('.table__end-game-text');
const endGameButton = document.querySelector('.table__end-game-button');
const winningCombinations = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
]

endGameButton.addEventListener('click', () => {
   endGameMessageBlock.classList.add('non-active');
   gameStart();
})

//When game start, this function executing
function gameStart() {
   table.classList.add(currentTurn);
   cells.forEach(cell => {
      cell.classList.remove('x-placed');
      cell.classList.remove('zero-placed');
      cell.removeEventListener('click', cellOnCLick);
      cell.addEventListener('click', cellOnCLick, { once: true });
   })
}

gameStart();

function cellOnCLick(evt) {
   const cell = evt.target;
   if (table.classList.contains('current-x')) {
      cell.classList.add('x-placed');
   } else {
      cell.classList.add('zero-placed');
   }

   //Check for win
   if (checkWin(currentTurn)) {
      endGameMessageBlock.classList.remove('non-active');
      endGameText.innerText = `${currentTurn === 'current-x' ? 'Крестики' : 'Нолики'} победили`;
   }

   //Check for draw
   if (checkDraw()) {
      endGameMessageBlock.classList.remove('non-active');
      endGameText.innerText = "Ничья";
   }

   //If not draw and not win for anyone - swap turns
   swapTurns();
}

function swapTurns() {
   if (currentTurn === 'current-x') {
      table.classList.remove('current-x');
      table.classList.add('current-zero');
      currentTurn = 'current-zero';
   } else {
      table.classList.remove('current-zero');
      table.classList.add('current-x');
      currentTurn = 'current-x';
   }
}

function checkWin(currentTurn) {
   let currentCell;
   if (currentTurn === 'current-x') {
      currentCell = 'x-placed';
   } else {
      currentCell = 'zero-placed';
   }

   return winningCombinations.some(combination => {
      return combination.every(index => {
         return cells[index].classList.contains(currentCell);
      })
   })
}

//Check for if every cell have x or 0 
function checkDraw() {
   return [...cells].every(cell => {
      return cell.classList.contains('x-placed') || cell.classList.contains('zero-placed');
   })
}
