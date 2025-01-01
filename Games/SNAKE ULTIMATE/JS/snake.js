// Selección de elementos del DOM
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const levelElement = document.getElementById("level");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreElement = document.getElementById("finalScore");
const restartGameOverBtn = document.getElementById("restartGameOverBtn");
const pauseBtn = document.getElementById("pauseBtn");

// Configuración inicial
const box = 20;
const rows = canvas.height / box;
const cols = canvas.width / box;
let snake = [{ x: 5 * box, y: 5 * box }];
let food = spawnFood();
let score = 0;
let highScore = 0;
let level = 1;
let direction = null;
let gameRunning = true;
let gamePaused = false;
let gameSpeed = 150;

// Sonidos
const eatSound = new Audio("sounds/eat.mp3");
const gameOverSound = new Audio("sounds/gameover.mp3");

// Función para dibujar la serpiente
function drawSnake() {
    snake.forEach((segment, index) => {
        // Asigna el color dependiendo si es la cabeza o el cuerpo
        ctx.fillStyle = index === 0 ? "#55a855" : "#338033"; // La cabeza de color verde claro, el cuerpo de verde normal
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}

// Genera comida en posición aleatoria
function spawnFood() {
    return {
        x: Math.floor(Math.random() * cols) * box,
        y: Math.floor(Math.random() * rows) * box,
    };
}

// Dibuja la comida redonda
function drawFood() {
    ctx.fillStyle = "#ef2d56";  // Color rojo para la comida
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);  // Dibujar círculo para la comida
    ctx.fill();
    ctx.strokeStyle = "#8c1930";  // Borde de la comida
    ctx.stroke();
}
// Mueve la serpiente
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;

    // Inserta la nueva cabeza
    snake.unshift(head);

    // Si la serpiente come la comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        updateScore();
        food = spawnFood();
        eatSound.play();
        if (score % 5 === 0) levelUp();
    } else {
        // Elimina el último segmento si no come
        snake.pop();
    }
}

// Detecta colisiones
function checkCollision() {
    const head = snake[0];

    // Colisión con paredes (pasa al otro lado)
    if (head.x < 0) head.x = canvas.width - box;
    if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - box;
    if (head.y >= canvas.height) head.y = 0;

    // Colisión con el cuerpo
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Actualiza el puntaje y el nivel
function updateScore() {
    scoreElement.textContent = score;
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
    }
}

// Sube de nivel
function levelUp() {
    level++;
    levelElement.textContent = level;
    if (gameSpeed > 50) gameSpeed -= 10; // Incrementa la dificultad reduciendo el intervalo de tiempo
}

// Pantalla de Game Over
function gameOver() {
    gameRunning = false;
    gameOverSound.play();
    gameOverScreen.classList.remove("hidden");
    finalScoreElement.textContent = score;
}

// Reinicia el juego
function restartGame() {
    snake = [{ x: 5 * box, y: 5 * box }];
    food = spawnFood();
    score = 0;
    level = 1;
    direction = null;
    gameRunning = true;
    gamePaused = false;
    gameSpeed = 150;
    updateScore();
    levelElement.textContent = level;
    gameOverScreen.classList.add("hidden");
}

// Lógica principal del juego
function gameLoop() {
    if (gameRunning && !gamePaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        moveSnake();

        if (checkCollision()) {
            gameOver();
        }
    }
    setTimeout(gameLoop, gameSpeed);
}

// Control del teclado
document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";

    // Evita que las teclas muevan la barra de desplazamiento
    if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
    }
});

// Pausa el juego
pauseBtn.addEventListener("click", () => {
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? "Reanudar" : "Pausar";
});

// Reinicia desde la pantalla de Game Over
restartGameOverBtn.addEventListener("click", restartGame);

// Inicia el bucle del juego
gameLoop();
///////////////////////////////////////
