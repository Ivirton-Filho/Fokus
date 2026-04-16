const html = document.querySelector("html"); // Seleciona o elemento HTML para alterar o atributo data-contexto
const focobt = document.querySelector(".app__card-button--foco");// Seleciona o botão de foco
const curtobt = document.querySelector(".app__card-button--curto");// Seleciona o botão de descanso curto
const longobt = document.querySelector(".app__card-button--longo");// Seleciona o botão de descanso longo
const banner = document.querySelector(".app__image");// Seleciona a imagem do banner
const text = document.querySelector(".app__title");// Seleciona o título
const bottons = document.querySelectorAll(".app__card-button");// Seleciona todos os botões
const musicInput = document.getElementById("alternar-musica");// Seleciona o input de música
const musica = new Audio("./sons/luna-rise-part-one.mp3"); // Cria um objeto de áudio para a música de foco

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
  bottons.forEach((botton) => { // Remove a classe "active" de todos os botões
    botton.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      text.innerHTML = "Otimize sua produtividade, <strong class='app__title-strong'>mergulhe no que importa.</strong>";
      break;
    case "descanso-curto":
      text.innerHTML = "Faça uma pausa, <strong class='app__title-strong'>recarregue suas energias e volte com tudo!</strong>";
      break;
    case "descanso-longo":
      text.innerHTML = "Hora de voltar à superfície, <strong class='app__title-strong'>recarregado</strong> e pronto para conquistar o mundo!";
      break;
  }
  console.log(contexto);
}
