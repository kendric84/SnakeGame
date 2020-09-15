let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const GRID_SIZE = 20;
let snakeStartX = 500;
const SNAKE_START_Y = 280;
const SNAKE_START_SEGMENTS = 5;
let snakeBody = [];
let snakeDirection = "";
let snakeMoving = false;
let gameSpeed = 300;
let apple = new Image();
apple.src = "./Assets/apple3.png";
let snake = new Image();
snake.src = "./Assets/snake-head2.png";
let appleX = 200;
let appleY = 280;

function canvasSetup() {
  let i = 0;
  for (i = 0; i < SNAKE_START_SEGMENTS; i++) {
    snakeBody.push([snakeStartX, SNAKE_START_Y, GRID_SIZE, GRID_SIZE]);
    snakeStartX += 20;
  }
  drawSnake();
  
  ctx.drawImage(apple, appleX, appleY);  
  ctx.drawImage(snake, snakeBody[0][0] - 40, snakeBody[0][1] - 14);
}

function moveSnake() {
  if (snakeMoving) {
    ctx.fillStyle = "#008000";
    let lastPiece = snakeBody.length - 1;
    ctx.fillRect(
      snakeBody[lastPiece][0],
      snakeBody[lastPiece][1],
      snakeBody[lastPiece][2],
      snakeBody[lastPiece][3]
    );

    switch (snakeDirection) {
      case "Up":
        snakeBody.unshift([
          snakeBody[0][0],
          snakeBody[0][1] - GRID_SIZE,
          GRID_SIZE,
          GRID_SIZE,
        ]);
        snakeBody.splice(-1, 1);
        drawSnake();
        return;
      case "Right":
        snakeBody.unshift([
          snakeBody[0][0] + GRID_SIZE,
          snakeBody[0][1],
          GRID_SIZE,
          GRID_SIZE,
        ]);
        snakeBody.splice(-1, 1);
        drawSnake();
        return;
      case "Down":
        snakeBody.unshift([
          snakeBody[0][0],
          snakeBody[0][1] + GRID_SIZE,
          GRID_SIZE,
          GRID_SIZE,
        ]);
        snakeBody.splice(-1, 1);
        drawSnake();
        return;
      case "Left":
        snakeBody.unshift([
          snakeBody[0][0] - GRID_SIZE,
          snakeBody[0][1],
          GRID_SIZE,
          GRID_SIZE,
        ]);
        snakeBody.splice(-1, 1);
        drawSnake();
        return;
    }
  }
}

function drawSnake() {
  ctx.fillStyle = "#ffe500";
  let i = 0;
  for (i = 0; i < snakeBody.length; i++) {
    let j = 0;
    for (j = 0; j < snakeBody[i].length; j++) {
      ctx.fillRect(
        snakeBody[i][0],
        snakeBody[i][1],
        snakeBody[i][2],
        snakeBody[i][3]
      );
      ctx.lineWidth = 1;
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
  }
  /*let snakeLength = new Set(snakeBody).size;
console.log(snakeLength);
console.log(snakeBody.length);*/
  ctx.drawImage(snake, snakeBody[0][0] - 40, snakeBody[0][1] - 14);
  appleEaten();
}

function appleEaten() {
  if (snakeBody[0][0] === appleX && snakeBody[0][1] === appleY) {
    appleX = Math.floor(Math.random() * (800 / GRID_SIZE)) * GRID_SIZE;
    appleY = Math.floor(Math.random() * (600 / GRID_SIZE)) * GRID_SIZE;
    ctx.drawImage(apple, appleX, appleY);
    gameSpeed = gameSpeed * 0.95;
    clearInterval(refresh);
    refresh = setInterval(moveSnake, gameSpeed);
    snakeBody.unshift(snakeBody[0]);
    drawSnake();
  }
}

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      if (snakeDirection === "Up" || snakeDirection === "Down") {
        return;
      } else {
        snakeMoving = true;
        snakeDirection = "Up";
        return;
      }
    case "ArrowRight":
      if (snakeDirection === "Right" || snakeDirection === "Left") {
        return;
      } else {
        snakeMoving = true;
        snakeDirection = "Right";
        return;
      }
    case "ArrowDown":
      if (snakeDirection === "Up" || snakeDirection === "Down") {
        return;
      } else {
        snakeMoving = true;
        snakeDirection = "Down";
        return;
      }
    case "ArrowLeft":
      if (snakeDirection === "Right" || snakeDirection === "Left") {
        return;
      } else {
        snakeMoving = true;
        snakeDirection = "Left";
        return;
      }
  }
});

canvasSetup();

let refresh = setInterval(moveSnake, gameSpeed);
