let currentMoleTile, currentPlantTile;
let score = 0;
let gameOver = false;

const setupGame = () => {
  const board = document.getElementById("board");

  // Add 9 tiles to board with id from 0-8
  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.id = i.toString();

    tile.addEventListener("click", clickListener);

    board.append(tile);
  }

  // Generate mole & plant on certain interval
  setInterval(addMole, 1000);

  setInterval(addPlant, 2000);
};

// Stop the game or add score on tile click
function clickListener() {
  if (gameOver) return;

  if (this.id === currentMoleTile.id) {
    score += 10;

    const scoreDiv = document.getElementById("score");
    scoreDiv.innerHTML = score;
  } else if (this.id === currentPlantTile.id) {
    gameOver = true;

    const scoreDiv = document.getElementById("score");
    scoreDiv.innerHTML = "Game Over: " + score;
  }
}

// Get tile to generate on
const getRandomTileNumber = () => {
  return Math.floor(Math.random() * 9).toString();
};

// Add a mole on random tile if no plant present
const addMole = () => {
  if (gameOver) return;

  if (currentMoleTile) {
    currentMoleTile.innerHTML = "";
  }

  const tileId = getRandomTileNumber();

  if (currentPlantTile && currentPlantTile.id === tileId) return;

  const mole = document.createElement("img");
  mole.src = "public/images/monty-mole.png";

  currentMoleTile = document.getElementById(tileId);

  currentMoleTile.appendChild(mole);
};

// Add a plant on random tile if no mole present

const addPlant = () => {
  if (gameOver) return;

  if (currentPlantTile) {
    currentPlantTile.innerHTML = "";
  }

  const tileId = getRandomTileNumber();

  if (currentMoleTile && currentMoleTile.id === tileId) return;

  const plant = document.createElement("img");
  plant.src = "public/images/piranha-plant.png";

  currentPlantTile = document.getElementById(tileId);

  currentPlantTile.appendChild(plant);
};

// setup the game items on load
window.onload = setupGame;
