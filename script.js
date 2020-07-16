function init() {
    canvas = document.getElementById("myCanvas");
    W = canvas.width = 800;
    H = canvas.height = 600;
    pen = canvas.getContext("2d");
    cellSize = 66;
    food = getRandomFood();
    score = 0;
    gameOver = false;

    //Image of food
    foodImg = new Image();
    foodImg.src = "Assets/apple.png";

    //Image for score
    scoreImg = new Image();
    scoreImg.src = "Assets/trophy.png";


    //object
    snake = {
        //data members
        init_len: 5,
        color: "blue",
        direction: "right",
        cells: [],

        //methords
        createSnake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 1 });
            }
        },

        displaySnake: function () {
            for (var i = 0; i < this.cells.length; i++) {

                pen.fillStyle = this.color;
                //position(x,y) & size(len,wid)
                pen.fillRect(this.cells[i].x * cellSize, this.cells[i].y * cellSize
                    , cellSize - 2, cellSize - 2)
            }

        },

        updateSnake: function () {
            //insert new head
            var curHeadX = this.cells[0].x;
            var curHeadY = this.cells[0].y;

            //if snake has eaten food
            if (curHeadX == food.x && curHeadY == food.y) {
                console.log("Food eaten");
                score++;
                food = getRandomFood(); //update food lockation
            }
            else {
                //pop last cell
                this.cells.pop();
            }



            var newHeadX, newHeadY;
            if (this.direction === "right") {
                newHeadX = curHeadX + 1;
                newHeadY = curHeadY;
            }
            else if (this.direction === "left") {
                newHeadX = curHeadX - 1;
                newHeadY = curHeadY;
            }
            else if (this.direction === "down") {
                newHeadX = curHeadX;
                newHeadY = curHeadY + 1
            }
            else if (this.direction === "up") {
                newHeadX = curHeadX;
                newHeadY = curHeadY - 1;
            }

            //add to begg. of array
            this.cells.unshift({ x: newHeadX, y: newHeadY });

            //out of bounds check
            if (newHeadX * cellSize < 0 || newHeadY * cellSize < 0 || (newHeadX + 1) * cellSize > W || (newHeadY + 1) * cellSize > H) {
                setGameOver();
            }

        }
    };

    //init
    snake.createSnake();

    //Add Event Listener's function
    function keyPressed(e) { //e contains matadata about pressed key
        //which direction to go
        if (e.key === "ArrowUp") {
            snake.direction = "up";
        }
        else if (e.key === "ArrowDown") {
            snake.direction = "down";
        }
        else if (e.key === "ArrowLeft") {
            snake.direction = "left";
        }
        else if (e.key === "ArrowRight") {
            snake.direction = "right";
        }
    }
    //Add Event Listener on the document object
    document.addEventListener("keydown", keyPressed);
}

function draw() {
    //clearRect is an eraser with top left corner at 0,0 and dimentions W,H
    pen.clearRect(0, 0, W, H);
    snake.displaySnake();

    //display food
    pen.fillStyle = food.color;
    pen.drawImage(foodImg, food.x * cellSize, food.y * cellSize, cellSize, cellSize);
    //pen.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

    //display Score
    pen.drawImage(scoreImg, cellSize - 25, cellSize - 30, cellSize, cellSize);
    pen.font = "25px Roboto";
    pen.fillStyle = "blue";
    pen.fillText(score, cellSize, cellSize);
}
function update() {
    snake.updateSnake();
}

function getRandomFood() {
    var foodX = Math.round(Math.random() * (W - cellSize) / cellSize);
    var foodY = Math.round(Math.random() * (H - cellSize) / cellSize);

    var food = {
        x: foodX,
        y: foodY,
        color: "red"
    }

    return food;
}

function gameLoop() {
    if (gameOver) {
        clearInterval(f);
    }
    draw();
    update();
}

function setGameOver() {
    gameOver = !gameOver;
}

init();

var f = setInterval(gameLoop, 150);

