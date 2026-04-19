const TEMPO_FOCO = 1500;

// Elementos da interface
const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const banner = document.querySelector(".app__image");
const text = document.querySelector(".app__title");
const musicInput = document.getElementById("alternar-musica");
const startPauseBt = document.getElementById("start-pause");
const textBtStartPause = document.querySelector("#start-pause span");
const imgBtStartPause = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector("#timer");

// Audios
const musica = new Audio("./sounds/luna-rise-part-one.mp3");
const audioPause = new Audio("./sounds/pause.mp3");
const audioEnd = new Audio("./sounds/beep.mp3");
const audioPlay = new Audio("./sounds/play.wav");

// Estado da aplicacao
let tempoSegundos = TEMPO_FOCO;
let intervaloId = null;

musicInput.addEventListener("change", () => {
  if (musicInput.checked) {
    musica.play();
    musica.loop = true; // Define a música para tocar em loop
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  alterarContexto("foco"); // Altera o contexto para "foco" e atualiza a interface
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto"); // Altera o contexto para "descanso-curto" e atualiza a interface
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo"); // Altera o contexto para "descanso-longo" e atualiza a interface
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  botoes.forEach((botao) => {
    // Remove a classe "active" de todos os botões
    botao.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./images/${contexto}.png`);
  switch (contexto) {
    case "foco":
      text.innerHTML =
        "Otimize sua produtividade, <strong class='app__title-strong'>mergulhe no que importa.</strong>";
      break;
    case "descanso-curto":
      text.innerHTML =
        "Faça uma pausa, <strong class='app__title-strong'>recarregue suas energias e volte com tudo!</strong>";
      tempoSegundos = 300; // Define o tempo para descanso curto
      mostrarTempo(); // Atualiza o tempo exibido na tela
      break;
    case "descanso-longo":
      text.innerHTML =
        "Hora de voltar à superfície, <strong class='app__title-strong'>recarregado</strong> e pronto para conquistar o mundo!";
      tempoSegundos = 900; // Define o tempo para descanso curto
      mostrarTempo(); // Atualiza o tempo exibido na tela
      break;
  }
  console.log(contexto);
}

const contagemRegressiva = () => {
  // controla o cronometro regressivo, decrementando o tempo a cada segundo
  if (tempoSegundos <= 0) {
    pausarContagem();
    audioEnd.play(); // Toca o som de término
    alert("Tempo esgotado!");
    textBtStartPause.textContent = "Começar"; // Altera o texto do botão para "iniciar"
    imgBtStartPause.setAttribute("src", "./images/play_arrow.png"); // Altera a imagem do botão para "iniciar"
    return;
  }
  tempoSegundos--;
  mostrarTempo(); // Atualiza o tempo exibido na tela
};

startPauseBt.addEventListener("click", () => {
  iniciarOuPausar();
});

function iniciarOuPausar() {
  if (intervaloId) {
    pausarContagem(); // Pausa a contagem se já estiver em andamento
    audioPause.play(); // Toca o som de pausa
    textBtStartPause.textContent = "Continuar"; // Altera o texto do botão
    imgBtStartPause.setAttribute("src", "./images/play_arrow.png"); // Altera a imagem do botão para "iniciar"
  } else {
    audioPlay.play(); // Toca o som de início
    intervaloId = setInterval(contagemRegressiva, 1000); // Inicia a contagem regressiva a cada segundo
    textBtStartPause.textContent = "Pausar"; // Altera o texto do botão
    imgBtStartPause.setAttribute("src", "./images/pause.png"); // Altera a imagem do botão para "pausar"
  }
}

function pausarContagem() {
  clearInterval(intervaloId); // Pausa a contagem regressiva
  intervaloId = null; // Limpa o ID do intervalo
}

function mostrarTempo() {
  const tempo = new Date(tempoSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
