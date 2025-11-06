// ---------------------------
// Funções de Persistência (localStorage)
// ---------------------------

// Lê as tarefas guardadas
function getTarefas() {
  const tarefasJSON = localStorage.getItem("TAREFAS");
  if (!tarefasJSON) {
    return [];
  }
  try {
    return JSON.parse(tarefasJSON);
  } catch (e) {
    console.error("Erro ao ler JSON:", e);
    return [];
  }
}

// Guarda as tarefas
function saveTarefas(tarefas) {
  localStorage.setItem("TAREFAS", JSON.stringify(tarefas));
}

// ---------------------------
// CRUD - Criação
// ---------------------------

function adicionarTarefa(titulo) {
  const tarefas = getTarefas();

  const novaTarefa = {
    id: Date.now(),
    titulo: titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);
  saveTarefas(tarefas);
  mostrarTarefas(); // atualiza a lista no ecrã
}

// ---------------------------
// Leitura e Visualização no DOM
// ---------------------------

function mostrarTarefas() {
  const lista = document.getElementById("task-list");
  lista.innerHTML = ""; // limpa lista atual

  const tarefas = getTarefas();

  tarefas.forEach(tarefa => {
    const li = document.createElement("li");
    li.textContent = tarefa.titulo;
    lista.appendChild(li);
  });
}

// ---------------------------
// Event Listener do Formulário
// ---------------------------

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-tarefa");
  const input = document.getElementById("titulo-tarefa");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const titulo = input.value.trim();

    if (titulo !== "") {
      adicionarTarefa(titulo);
      input.value = "";
    }
  });

  // Carrega tarefas ao abrir
  mostrarTarefas();
});
