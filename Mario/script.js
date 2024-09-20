const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const gameOverScreen = document.getElementById("gameOverScreen");
const restartButton = document.getElementById("restartButton");
const backgroundMusic = document.getElementById("backgroundMusic");

let gameOver = false;
let pipeSpeed = 2;  // Velocidade inicial da animação do cano (em segundos)
let increaseSpeedInterval;

const jump = () => {
  if (!gameOver) {
    mario.classList.add("jump");

    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  }
}

const startGame = () => {
  increaseSpeed();  // Iniciar o aumento gradual da velocidade
  startLoop();      // Iniciar o loop do jogo
  playMusic();      // Tocar a música de fundo
}

const startLoop = () => {
  const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;

      mario.src = "imagem/game-over.png";
      mario.style.width = "80px";
      mario.style.marginLeft = "50px";

      gameOver = true;
      clearInterval(loop);
      clearInterval(increaseSpeedInterval);  // Parar o aumento de velocidade

      stopMusic();        // Parar a música ao morrer
      showGameOverScreen();  // Exibir tela de Game Over
    }

  }, 10);
}

// Função para tocar a música de fundo
const playMusic = () => {
  backgroundMusic.play();
}

// Função para parar a música de fundo
const stopMusic = () => {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0; // Reiniciar do começo quando o jogo for reiniciado
}

document.addEventListener("keydown", jump);

// Função para aumentar a velocidade do cano
const increaseSpeed = () => {
  increaseSpeedInterval = setInterval(() => {
    if (pipeSpeed > 0.8) {  // Limite de velocidade
      pipeSpeed -= 0.1;
      pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;
    }
  }, 4000);
}

// Função para mostrar a tela de Game Over
const showGameOverScreen = () => {
  gameOverScreen.style.display = "flex";  // Exibir tela de Game Over
}

// Função para reiniciar o jogo
const restartGame = () => {
  gameOver = false;
  pipeSpeed = 2;  // Resetar a velocidade do cano
  pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;
  pipe.style.left = "";  // Resetar a posição do cano

  mario.src = "imagem/mario.gif";
  mario.style.width = "150px";
  mario.style.marginLeft = "0";
  mario.style.animation = "";
  mario.style.bottom = "0px";  // Resetar a posição do Mario no chão

  gameOverScreen.style.display = "none";  // Esconder tela de Game Over

  playMusic();  // Reiniciar a música quando o jogo for reiniciado
  startGame();  // Reiniciar o jogo
}

// Adicionar evento ao botão de reiniciar
restartButton.addEventListener("click", restartGame);

// Iniciar o jogo
startGame();
