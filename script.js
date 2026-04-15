const html = document.querySelector('html');
const focobt = document.querySelector(".app__card-button--foco");
const curtobt = document.querySelector(".app__card-button--curto");
const longobt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector('.app__image');

focobt.addEventListener('click', () => {
        html.setAttribute('data-contexto', 'foco');
        banner.setAttribute('src', './imagens/foco.png');
});

curtobt.addEventListener('click', () => {
        html.setAttribute("data-contexto", "descanso-curto");
        banner.setAttribute('src', './imagens/descanso-curto.png');
});

longobt.addEventListener('click', () => {
        html.setAttribute('data-contexto', 'descanso-longo');
        banner.setAttribute('src', './imagens/descanso-longo.png');

}); 