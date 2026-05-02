// ----- Seletores do DOM -----
const btnAddTarefa = document.querySelector(".app__button--add-task");
const formAddTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const descricaoTarefaAndamento = document.querySelector(
  ".app__section-active-task-description",
);

// ----- Estado (localStorage) -----
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let tarefaSelecionada = null; // Variável para armazenar a tarefa atualmente selecionada

// ----- Lista no DOM -----
const ulTarefas = document.querySelector(".app__section-task-list");

// ----- Criacao do item de tarefa -----
function criarTarefa(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  // ----- Atualiza a tarefa no localStorage -----
  const atualizarTarefa = (novaDescricao) => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  };

  // Icone de status
  const svg = document.createElement("svg");
  svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;
  // Texto da tarefa
  const paragrafo = document.createElement("p");
  paragrafo.classList.add("app__section-task-list-item-description");
  paragrafo.textContent = tarefa.descricaoTarefa;

  // Botao de editar tarefa
  const buttonEdit = document.createElement("button");
  buttonEdit.classList.add("app_button-edit");
  buttonEdit.onclick = () => {
    const novaDescricao = prompt("Editar tarefa", tarefa.descricaoTarefa);
    if (!novaDescricao) {
      alert("A descrição da tarefa não pode ser vazia!");
      return;
    }
    tarefa.descricaoTarefa = novaDescricao;
    atualizarTarefa(novaDescricao);
    location.reload();
  };

  // Icone do botao de editar
  const imgButton = document.createElement("img");
  imgButton.setAttribute("src", "/images/edit.png");
  buttonEdit.append(imgButton);

  // Monta a estrutura do item (icone, texto e botao)
  li.append(svg, paragrafo, buttonEdit);

  // Clique no item: exibe descricao em andamento e alterna estilo ativo
  li.onclick = () => {
    document
      .querySelectorAll(".app__section-task-list-item-active")
      .forEach((elemento) => {
        elemento.classList.remove("app__section-task-list-item-active");
      });

    if (tarefaSelecionada == tarefa) {
      descricaoTarefaAndamento.textContent = ""; // Limpa a descrição da tarefa em andamento
      tarefaSelecionada = null; // Deseleciona a tarefa
      return;
    }
    descricaoTarefaAndamento.textContent = tarefa.descricaoTarefa; // Atualiza o texto da tarefa em andamento exibida no topo
    tarefaSelecionada = tarefa; // Marca a tarefa atual como selecionada

    li.classList.add("app__section-task-list-item-active");
  };

  return li;
}

// ----- Eventos -----

btnAddTarefa.addEventListener("click", () => {
  formAddTarefa.classList.toggle("hidden");
});

formAddTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();

  // Cria a tarefa a partir do texto
  const tarefa = {
    descricaoTarefa: textArea.value,
  };
  tarefas.push(tarefa);
  const elementoTarefa = criarTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
  atualizarTarefa(tarefas);
  textArea.value = "";
  formAddTarefa.classList.add("hidden");
});

tarefas.forEach((tarefa) => {
  const elemento = criarTarefa(tarefa);
  ulTarefas.append(elemento);
});
