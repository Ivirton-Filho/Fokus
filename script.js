const html = document.querySelector("html");
const focobt = document.querySelector(".app__card-button--foco");
const curtobt = document.querySelector(".app__card-button--curto");
const longobt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");

focobt.addEventListener("click", () => {
  alterarContexto("foco");
});

curtobt.addEventListener("click", () => {
  alterarContexto("descanso-curto");
});

longobt.addEventListener("click", () => {
  alterarContexto("descanso-longo");
});

function alterarContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
}
