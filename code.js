let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let gridSize = 30;
let canvasWidth = 750;
let canvasHeight = 510;
let snakeStartX = 420;
let snakeStartY = 270;
let snakeStartSegments = 5;
let appleStartX = 210;
let appleStartY = 270;
let snakeX = snakeStartX;
let snakeBody = [];
let snakeDirection = "";
let snakeMoving = false;
let gameSpeed = 300;
let apple = new Image();
apple.src = "./Assets/apple2.png";
let snakeHead = new Image();
snakeHead.src = "./Assets/snake-head.png";
let appleX = appleStartX;
let appleY = appleStartY;
let snakeHeadX = 0;
let snakeHeadY = 0;
let snakeHeadRotation = 0;
let appleCount = 0

document.getElementById("easy").addEventListener("click", function (){
gridSize = 30;
canvasWidth = 750;
canvasHeight = 510;
snakeStartX = 420;
snakeStartY = 270;
snakeStartSegments = 5;
appleStartX = 210;
appleStartY = 270;
snakeX = snakeStartX;
snakeBody = [];
snakeDirection = "";
snakeMoving = false;
gameSpeed = 300;
apple = new Image();
apple.src = "./Assets/apple2.png";
snakeHead = new Image();
snakeHead.src = "./Assets/snake-head.png";
appleX = appleStartX;
appleY = appleStartY;
snakeHeadX = 0;
snakeHeadY = 0;
snakeHeadRotation = 0;
appleCount = 0
canvasSetup();
})

document.getElementById("hard").addEventListener("click", function (){
  gridSize = 20;
  canvasWidth = 800;
  canvasHeight = 600;
  snakeStartX = 500;
  snakeStartY = 280;
  snakeStartSegments = 7;
  appleStartX = 220;
  appleStartY = 280;
  snakeX = snakeStartX;
  snakeBody = [];
  snakeDirection = "";
  snakeMoving = false;
  gameSpeed = 200;
  apple = new Image();
  apple.src = "./Assets/apple3.png";
  snakeHead = new Image();
  snakeHead.src = "./Assets/snake-head2.png";
  appleX = appleStartX;
  appleY = appleStartY;
  snakeHeadX = 0;
  snakeHeadY = 0;
  snakeHeadRotation = 0;
  appleCount = 0
  canvasSetup();
})

function canvasSetup() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  snakeBody = [];
  let i = 0;
  for (i = 0; i < snakeStartSegments; i++) {
    snakeBody.push([snakeX, snakeStartY, gridSize, gridSize]);
    snakeX += gridSize;
  }
  snakeHeadRotation = 0;
  snakeHeadX = gridSize *-.98;
  snakeHeadY = gridSize *-.7;
  drawSnake();
  document.getElementById("count").value = appleCount;
  ctx.drawImage(apple, appleX, appleY);
}

function moveSnake() {
  if (snakeMoving === true) {
    ctx.fillStyle = "#008000";
    let lastPiece = snakeBody.length - 1;
    ctx.fillRect(
      snakeBody[lastPiece][0],
      snakeBody[lastPiece][1],
      snakeBody[lastPiece][2],
      snakeBody[lastPiece][3]
    );

    let hasDup = false;

    for (let i = 1; i < snakeBody.length; i++) {
      if (snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
        hasDup = true;
      }
    }

    if (hasDup === true) {
      snakeMoving = false;
      snakeDirection = "";
      snakeX = snakeStartX;
      appleX = appleStartX;
      appleY = appleStartY;
      gameSpeed = 250;
      clearInterval(refresh);
      refresh = setInterval(moveSnake, gameSpeed);
      appleCount = 0;
      canvasSetup();
      return;
    }
    switch (snakeDirection) {
      case "Up":
        snakeBody.unshift([
          snakeBody[0][0],
          snakeBody[0][1] - gridSize,
          gridSize,
          gridSize,
        ]);
        snakeBody.splice(-1, 1);
        drawSnake();
        return;
      case "Right":
        snakeBody.unshift([
          snakeBody[0][0] + gridSize,
          snakeBody[0][1],
          gridSize,
          gridSize,
        ]);
        snakeBody.splice(-1, 1);
        drawSnake();
        return;
      case "Down":
        snakeBody.unshift([
          snakeBody[0][0],
          snakeBody[0][1] + gridSize,
          gridSize,
          gridSize,
        ]);
        snakeBody.splice(-1, 1);
        drawSnake();
        return;
      case "Left":
        snakeBody.unshift([
          snakeBody[0][0] - gridSize,
          snakeBody[0][1],
          gridSize,
          gridSize,
        ]);
        snakeBody.splice(-1, 1);
        drawSnake();
        return;
    }
  }
}

function drawSnake() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.drawImage(apple, appleX, appleY);
  ctx.fillStyle = "#ffe500";
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(
      snakeBody[i][0],
      snakeBody[i][1],
      snakeBody[i][2],
      snakeBody[i][3]
    );
    ctx.beginPath();
    ctx.lineWidth = gridSize/10;
    ctx.strokeStyle = "black";
    ctx.rect(
      snakeBody[i][0],
      snakeBody[i][1],
      snakeBody[i][2],
      snakeBody[i][3]
    );
    ctx.stroke();
  }

  //Rotate snake head
  ctx.save();
  ctx.translate(snakeBody[0][0],snakeBody[0][1]);
  if (snakeDirection === "Right") {
    ctx.scale(1, -1)
  }
  ctx.rotate(snakeHeadRotation * Math.PI / 180);
  ctx.drawImage(snakeHead, snakeHeadX, snakeHeadY);
  ctx.translate((snakeBody[0][0])*-1,(snakeBody[0][1])*-1);
  ctx.restore();

  //Check if snake has hit border
  if (
    snakeBody[0][0] < 0 ||
    snakeBody[0][0] >= canvasWidth ||
    snakeBody[0][1] < 0 ||
    snakeBody[0][1] >= canvasHeight
  ) {
    snakeMoving = false;
    snakeDirection = "";
    snakeX = snakeStartX;
    appleX = appleStartX;
    appleY = appleStartY;
    gameSpeed = 250;
    snakeHeadRotation = 0;
    snakeHeadX = gridSize *-1;
    snakeHeadY = gridSize *-.7;
    clearInterval(refresh);
    refresh = setInterval(moveSnake, gameSpeed);
    appleCount = 0;
    canvasSetup();
    return;
  }

  //check if snake has eaten apple & reset
  if (snakeBody[0][0] === appleX && snakeBody[0][1] === appleY) {
    appleX = Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize;
    appleY = Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize;
    ctx.drawImage(apple, appleX, appleY);
    gameSpeed = gameSpeed * 0.95;
    clearInterval(refresh);
    refresh = setInterval(moveSnake, gameSpeed);
    let secondToLastX = snakeBody[snakeBody.length - 2][0];
    let secondToLastY = snakeBody[snakeBody.length - 2][1];
    let lastX = snakeBody[snakeBody.length - 1][0];
    let lastY = snakeBody[snakeBody.length - 1][1];
    let newPieceX = 0;
    let newPieceY = 0;
    newPieceX = lastX - secondToLastX;
    newPieceY = lastY - secondToLastY;
    snakeBody.push([
      lastX + newPieceX,
      lastY + newPieceY,
      gridSize,
      gridSize,
    ]);
    appleCount ++;
    document.getElementById("count").value = appleCount;
  }
}

//Key press
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      if (snakeDirection === "Up" || snakeDirection === "Down") {
        return;
      } else {
        snakeMoving = true;
        snakeDirection = "Up";
        snakeHeadRotation = 90;
        snakeHeadX = (gridSize) *-.98;
        snakeHeadY = (gridSize) *-1.7;
        return;
      }
    case "ArrowRight":
      if (snakeDirection === "Right" || snakeDirection === "Left") {
        return;
      } else {
        snakeMoving = true;
        snakeDirection = "Right";
        snakeHeadRotation = 180;
        snakeHeadX = gridSize *-2.1;
        snakeHeadY = gridSize *-.7;
        return;
      }
    case "ArrowDown":
      if (snakeDirection === "Up" || snakeDirection === "Down") {
        return;
      } else {
        snakeMoving = true;
        snakeDirection = "Down";
        snakeHeadRotation = -90;
        snakeHeadX = gridSize *-2.1;
        snakeHeadY = gridSize *-.7;
        return;
      }
    case "ArrowLeft":
      if (snakeDirection === "Right" || snakeDirection === "Left") {
        return;
      } else {
        snakeMoving = true;
        snakeDirection = "Left";
        snakeHeadRotation = 0;
        snakeHeadX = gridSize *-.98;
        snakeHeadY = gridSize *-.7;
        return;
      }
  }
});

canvasSetup();

let refresh = setInterval(moveSnake, gameSpeed);