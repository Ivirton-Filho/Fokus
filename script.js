const html = document.querySelector("html"); // Seleciona o elemento HTML para alterar o atributo data-contexto
const focobt = document.querySelector(".app__card-button--foco"); // Seleciona o botão de foco
const curtobt = document.querySelector(".app__card-button--curto"); // Seleciona o botão de descanso curto
const longobt = document.querySelector(".app__card-button--longo"); // Seleciona o botão de descanso longo
const banner = document.querySelector(".app__image"); // Seleciona a imagem do banner
const text = document.querySelector(".app__title"); // Seleciona o título
const bottons = document.querySelectorAll(".app__card-button"); // Seleciona todos os botões
const musicInput = document.getElementById("alternar-musica"); // Seleciona o input de música
const musica = new Audio("./sons/luna-rise-part-one.mp3"); // Cria um objeto de áudio para a música de foco
const startPauseBt = document.getElementById("start-pause"); // Seleciona o botão de iniciar/pausar
const audioPause = new Audio("./sons/pause.mp3"); // Cria um objeto de áudio para o som de pausa
const audioEnd = new Audio("./sons/beep.mp3"); // Cria um objeto de áudio para o som de término
const audioPlay = new Audio("./sons/play.wav"); // Cria um objeto de áudio para o som de início
const textBtStartPause = document.querySelector("#start-pause span"); // Seleciona o elemento de texto do botão de iniciar/pausar
const imgBtStartPause = document.querySelector(".app__card-primary-butto-icon"); // Seleciona a imagem do botão de iniciar/pausar
const TempoNaTela = document.querySelector("#timer");

let tempoSegundos = 1500; // Define o tempo padrão para foco
let intervaloId = null;

musicInput.addEventListener("change", () => {
  if (musicInput.checked) {
    musica.play();
    musica.loop = true; // Define a música para tocar em loop
  } else {
    musica.pause();
  }
});

focobt.addEventListener("click", () => {
  alterarContexto("foco"); // Altera o contexto para "foco" e atualiza a interface
  focobt.classList.add("active");
});

curtobt.addEventListener("click", () => {
  alterarContexto("descanso-curto"); // Altera o contexto para "descanso-curto" e atualiza a interface
  curtobt.classList.add("active");
});

longobt.addEventListener("click", () => {
  alterarContexto("descanso-longo"); // Altera o contexto para "descanso-longo" e atualiza a interface
  longobt.classList.add("active");
});

function alterarContexto(contexto) {
  bottons.forEach((botton) => {
    // Remove a classe "active" de todos os botões
    botton.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
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
    imgBtStartPause.setAttribute("src", "./imagens/play_arrow.png"); // Altera a imagem do botão para "iniciar"
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
    imgBtStartPause.setAttribute("src", "./imagens/play_arrow.png"); // Altera a imagem do botão para "iniciar"
  } else {
    audioPlay.play(); // Toca o som de início
    intervaloId = setInterval(contagemRegressiva, 1000); // Inicia a contagem regressiva a cada segundo
    textBtStartPause.textContent = "Pausar"; // Altera o texto do botão
    imgBtStartPause.setAttribute("src", "./imagens/pause.png"); // Altera a imagem do botão para "pausar"
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
  TempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
