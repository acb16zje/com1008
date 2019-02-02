/* Written by Zer Jun Eng, 2016*/
/* Javascript for the puzzle game only */
/* Credit: Images from http://imgur.com/gallery/Sjoz6 */

/********************** Functions **********************/
// Preload the images
function initAndStart(context) {
  let imageCount = 0;

  for (let i = 0; i < images.length; i++) {
    images[i].onload = function () {
      imageCount++;
      if (imageCount == images.length) {
        shuffle(tileOrder);
      }
    }
  }
}

// onclick event in HTML
function nextImage() {
  // Prevent the value going over 2
  randomVal = (randomVal + 1) % 3;
  shuffle(tileOrder);
}

// Shuffle the order
function shuffle(tiles) {
  let lastTile = tiles.length;
  let randomTile;
  let temp;
  solved = false;

  while (lastTile > 0) {
    // Randomly pick an element in the tiles
    randomTile = Math.floor(Math.random() * lastTile--);

    /* Bubble sort method to shuffle the tile order */
    // 1. Save the last element into a temporary variables
    // 2. Replace the last element with the randomly picked element
    // 3. The randomly picked element is replaced by the last element
    // 4. Swap completed, repeat again
    temp = tiles[lastTile];
    tiles[lastTile] = tiles[randomTile];
    tiles[randomTile] = temp;
  }

  isSolvable(tiles) ? getPuzzle(tiles) : shuffle(tileOrder);
}

function isSolvable(puzzle) {
  let invertCount = 0;

  for (let i = 0; i < 9 - 1; i++) {
    for (let j = i + 1; j < 9; j++) {
      // Value 0 is used for empty space
      invertCount += puzzle[j] && puzzle[i] && puzzle[i] > puzzle[j];
    }
  }

  return invertCount % 2 == 0;
}

// Pass the shuffled order into the 2D array
function getPuzzle(tiles) {
  let n = 0;

  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      board[row][column] = tiles[n];
      n += 1;
    }
  }
  drawPuzzle(context, images, board);
}

// Draw the tiles with number on top left corner
function drawPuzzle(context, images, board) {
  let x = 0;
  let y = 0;
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      context.font = "18px Verdana";
      context.textAlign = "start";
      context.fillStyle = "black";

      switch (board[row][column]) {
        case 1:
          context.drawImage(images[randomVal], 0, 0, S_WIDTH, S_HEIGHT, x, y,
              TILE_WIDTH, TILE_HEIGHT);
          context.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
          context.stroke();
          context.fillText("1", x + 5, y + 20);
          break;
        case 2:
          context.drawImage(images[randomVal], 300, 0, S_WIDTH, S_HEIGHT, x, y,
              TILE_WIDTH, TILE_HEIGHT);
          context.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
          context.stroke();
          context.fillText("2", x + 5, y + 20);
          break;
        case 3:
          context.drawImage(images[randomVal], 600, 0, S_WIDTH, S_HEIGHT, x, y,
              TILE_WIDTH, TILE_HEIGHT);
          context.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
          context.stroke();
          context.fillText("3", x + 5, y + 20);
          break;
        case 4:
          context.drawImage(images[randomVal], 0, 300, S_WIDTH, S_HEIGHT, x, y,
              TILE_WIDTH, TILE_HEIGHT);
          context.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
          context.stroke();
          context.fillText("4", x + 5, y + 20);
          break;
        case 5:
          context.drawImage(images[randomVal], 300, 300, S_WIDTH, S_HEIGHT, x,
              y, TILE_WIDTH, TILE_HEIGHT);
          context.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
          context.stroke();
          context.fillText("5", x + 5, y + 20);
          break;
        case 6:
          context.drawImage(images[randomVal], 600, 300, S_WIDTH, S_HEIGHT, x,
              y, TILE_WIDTH, TILE_HEIGHT);
          context.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
          context.stroke();
          context.fillText("6", x + 5, y + 20);
          break;
        case 7:
          context.drawImage(images[randomVal], 0, 600, S_WIDTH, S_HEIGHT, x, y,
              TILE_WIDTH, TILE_HEIGHT);
          context.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
          context.stroke();
          context.fillText("7", x + 5, y + 20);
          break;
        case 8:
          context.drawImage(images[randomVal], 300, 600, S_WIDTH, S_HEIGHT, x,
              y, TILE_WIDTH, TILE_HEIGHT);
          context.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
          context.stroke();
          context.fillText("8", x + 5, y + 20);
          break;
          // Fill the empty block with a white rectangle
        default:
          context.fillStyle = "#FFFFFF";
          context.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
          context.stroke();
          context.fillRect(x, y, TILE_WIDTH, TILE_HEIGHT);
          break;
      }
      x += TILE_WIDTH;
    }
    // Reset the x-coordinate back to 0 after a row
    x = 0;
    // Increase the y-coordinate after a row
    y += TILE_HEIGHT;
  }
  checkSolved();
}

// Credit: Lecture 15 example
function getMouseXY(e) {
  let boundingRect = canvas.getBoundingClientRect();
  let offsetX = boundingRect.left;
  let offsetY = boundingRect.top;
  let w = (boundingRect.width - canvas.width) / 2;
  let h = (boundingRect.height - canvas.height) / 2;
  offsetX += w;
  offsetY += h;
  // use clientX and clientY as getBoundingClientRect is used above
  let mx = Math.round(e.clientX - offsetX);
  let my = Math.round(e.clientY - offsetY);
  return {x: mx, y: my};
}

// Return the value of row and column after clicks
function whichGridCell(x, y) {
  if (x < 0) {
    x = 0;
  }
  if (y < 0) {
    y = 0;
  }
  if (x >= canvas.width) {
    x = canvas.width - 1;
  }
  if (y >= canvas.height) {
    y = canvas.height - 1;
  }
  let gx = Math.floor(x / TILE_WIDTH);
  let gy = Math.floor(y / TILE_HEIGHT);
  // need to be careful here
  // x, y on screen is column, row in grid
  return {row: gy, column: gx};
}

function checkTile(evt) {
  let position = getMouseXY(evt);
  let tile = whichGridCell(position.x, position.y);

  if (!solved) {
    // If not clicked on the top row, then check the upper tile
    if (tile.row > 0) {
      swapTile(tile.row - 1, tile.column, tile.row, tile.column);
    }
    // If not clicked on the bottom row, then check the lower tile
    if (tile.row < board.length - 1) {
      swapTile(tile.row + 1, tile.column, tile.row, tile.column);
    }
    // If not clicked on the first column, then check the left tile
    if (tile.column > 0) {
      swapTile(tile.row, tile.column - 1, tile.row, tile.column);
    }
    // If not clicked on the last column, then check the right tile
    if (tile.column < board[0].length - 1) {
      swapTile(tile.row, tile.column + 1, tile.row, tile.column);
    }
  }
}

function swapTile(row, column, toRow, toColumn) {
  // If the top/right/bottom/left tile is empty, swap it
  if (board[row][column] == 0) {
    board[row][column] = board[toRow][toColumn];
    board[toRow][toColumn] = 0;
    drawPuzzle(context, images, board);
  }
}

function checkSolved() {
  let correctCount = 0;
  let n = 1;

  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      if (board[row][column] == n) {
        // Check for 1, 2, 3, 4, 5, 6, 7, 8 in sequence
        correctCount++;
        n++;
      }
    }
  }

  // The user wins if the puzzle matches the tile order
  if (correctCount == 8 && board[board.length - 1][board[0].length - 1] == 0) {
    solved = true;
    winScreen();
  }
}

// Draw the complete images and winning animations
function winScreen() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;
  let column = 0;
  let total = 0;

  let oneByOne = setInterval(function () {
    context.drawImage(images[randomVal], x1, y1, S_WIDTH, S_HEIGHT, x2, y2,
        TILE_WIDTH, TILE_HEIGHT);
    x1 += 300;
    x2 += TILE_WIDTH;
    column++;
    total++;

    // Stop if 9 tiles are drawed
    if (total == 9) {
      clearInterval(oneByOne);

      // Filter to darken the image
      context.globalAlpha = 0.5;
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Flash the winning text
      context.globalAlpha = 1;
      context.font = "bold 25px Verdana";
      context.textAlign = "center";
      let colour = 0;
      let flash = setInterval(function () {
        // Only display the text when the puzzle is completed
        if (!solved) {
          clearInterval(flash);
        } else {
          // Flash in light red, light green and light blue
          if (colour == 0) {
            context.fillStyle = "#ffb3b3";
          } else if (colour == 1) {
            context.fillStyle = "#b3ffb3";
          } else if (colour == 2) {
            context.fillStyle = "#b3e6ff";
          }
          colour = (colour + 1) % 3;
          context.fillText("You win!", canvas.width / 2, canvas.height / 2
              - 20);
          context.fillText("Press start to play again", canvas.width
              / 2, canvas.height / 2 + 20);
        }
      }, 500);
    }
    else if (column == 3) {
      column = 0;
      x1 = 0;
      x2 = 0;
      y1 += 300;
      y2 += TILE_HEIGHT;
    }
  }, 150);
}

/******************** Main Program *********************/
/* Variables */
let canvas = document.getElementById("game");
/* Image and text will get blur by resizing the canvas through CSS */
// Setting this will give clear text, lines and image
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let context = canvas.getContext("2d");
let solved = false;
let randomVal = Math.floor((Math.random() * 1000) % 3);
let tileOrder = [1, 2, 3, 4, 5, 6, 7, 8, 0];

/* Images */
let images = [];
images[0] = new Image();
images[0].src = "../images/puzzles/sliding1.png";

images[1] = new Image();
images[1].src = "../images/puzzles/sliding2.png";

images[2] = new Image();
images[2].src = "../images/puzzles/sliding3.png";

/* 2D array for puzzle game */
let board = new Array(3);
for (let i = 0; i < board.length; i++) {
  board[i] = new Array(3);
}

/* Constant variables */
// All the images used are edited to 900px x 900px
const S_WIDTH = 300;
const S_HEIGHT = 300;
// Divide the canvas into 3x3 tiles
const TILE_NUM = 3;
const TILE_WIDTH = canvas.width / TILE_NUM;
const TILE_HEIGHT = canvas.height / TILE_NUM;

// Start of the program
initAndStart(context);
canvas.addEventListener('click', checkTile, false);
