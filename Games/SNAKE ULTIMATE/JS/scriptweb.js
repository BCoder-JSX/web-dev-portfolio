// Variables para elementos interactivos
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");
const gameOverScreen = document.getElementById("gameOverScreen");
const restartGameOverBtn = document.getElementById("restartGameOverBtn");

// Variable global para el estado del juego
let isGamePaused = false;

// Función para pausar/reanudar el juego
function togglePauseGame() {
    isGamePaused = !isGamePaused;
    if (isGamePaused) {
        // Aquí se detendría el bucle del juego (por ejemplo, deteniendo el movimiento del snake)
        alert("Juego pausado");
        pauseBtn.textContent = "Reanudar";
    } else {
        // Aquí se reanudaría el bucle del juego
        alert("Juego reanudado");
        pauseBtn.textContent = "Pausar";
    }
}

// Función para reiniciar el juego
function restartGame() {
    // Aquí reinicias la lógica y el estado del juego
    alert("Juego reiniciado");
    gameOverScreen.classList.add("hidden"); // Oculta la pantalla de Game Over
    // Reinicia el canvas y las variables relacionadas con el juego
}

// Eventos de los botones
pauseBtn.addEventListener("click", togglePauseGame);

restartBtn.addEventListener("click", () => {
    restartGame();
});

restartGameOverBtn.addEventListener("click", () => {
    restartGame();
});

// Función para mostrar la pantalla de Game Over
function showGameOverScreen(finalScore) {
    document.getElementById("finalScore").textContent = finalScore;
    gameOverScreen.classList.remove("hidden"); // Muestra la pantalla de Game Over
}
