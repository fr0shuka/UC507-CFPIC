// ---------------------------
// Persistência: localStorage
// ---------------------------

function getTarefas() {
  try {
    const data = localStorage.getItem("TAREFAS");
    return data ? JSON.parse(data) : [];
  } catch (erro) {
    console.error("Erro ao ler dados do localStorage:", erro);
    return [];
  }
}


function saveTarefas(tarefas) {
  localStorage.setItem("TAREFAS", JSON.stringify(tarefas));
}

// ---------------------------
// Criação
// ---------------------------

function adicionarTarefa(titulo) {
  const tarefas = getTarefas();
  const novaTarefa = {
    id: Date.now(),
    titulo,
    concluida: false
  };
  tarefas.push(novaTarefa);
  saveTarefas(tarefas);
  mostrarTarefas();
}

// ---------------------------
// Remover
// ---------------------------

function removerTarefa(idTarefa) {
  const tarefas = getTarefas();
  const idx = tarefas.findIndex(t => t.id === idTarefa);
  if (idx === -1) return; // não encontrada
  tarefas.splice(idx, 1);
  saveTarefas(tarefas);
  mostrarTarefas();
}

// ---------------------------
// Alternar Conclusão
// ---------------------------

function alternarConclusao(idTarefa) {
  const tarefas = getTarefas();
  const novas = tarefas.map(t => {
    if (t.id === idTarefa) {
      return { ...t, concluida: !t.concluida };
    }
    return t;
  });
  saveTarefas(novas);
  mostrarTarefas();
}

// ---------------------------
// Mostrar tarefas (DOM)
// ---------------------------

function mostrarTarefas() {
  const lista = document.getElementById("task-list");
  lista.innerHTML = "";

  const tarefas = getTarefas();

  if (tarefas.length === 0) {
    const vazio = document.createElement("li");
    vazio.textContent = "Nenhuma tarefa. Adiciona a primeira!";
    vazio.style.opacity = "0.7";
    vazio.style.padding = "10px";
    lista.appendChild(vazio);
    return;
  }

  tarefas.forEach(tarefa => {
    const li = document.createElement("li");
    li.className = "task-item";
    // adicionar classe de concluída ao item inteiro (para CSS)
    if (tarefa.concluida) {
      li.classList.add("concluida");
    }

    // atributo data-id para referencia
    li.dataset.id = tarefa.id;

    // Conteúdo (título)
    const tituloSpan = document.createElement("div");
    tituloSpan.className = "task-title";
    tituloSpan.textContent = tarefa.titulo;

    // Ações (botões)
    const actions = document.createElement("div");
    actions.className = "task-actions";

    const btnConcluir = document.createElement("button");
    btnConcluir.className = "btn btn-concluir";
    btnConcluir.textContent = tarefa.concluida ? "Desfazer" : "Concluir";
    btnConcluir.addEventListener("click", () => {
      alternarConclusao(tarefa.id);
    });

    const btnRemover = document.createElement("button");
    btnRemover.className = "btn btn-remover";
    btnRemover.textContent = "Remover";
    btnRemover.addEventListener("click", () => {
      // Confirmação opcional
      const ok = confirm("Remover a tarefa: \"" + tarefa.titulo + "\" ?");
      if (ok) removerTarefa(tarefa.id);
    });

    actions.appendChild(btnConcluir);
    actions.appendChild(btnRemover);

    // Anexa título e ações ao li (respeita o grid do CSS)
    li.appendChild(tituloSpan);
    li.appendChild(actions);

    lista.appendChild(li);
  });
}

// ---------------------------
// Fetch API externa
// ---------------------------

function fetchApiData() {
  const output = document.getElementById("api-output");
  output.textContent = "A carregar dados externos...";

  fetch("https://api.adviceslip.com/advice")
    .then(response => response.json())
    .then(data => {
      const texto = data.slip.advice;
      output.innerHTML = `<strong>Fato / Conselho:</strong> ${texto}`;
    })
    .catch(erro => {
      console.error("Erro ao carregar dados externos:", erro);
      output.textContent = "Erro ao carregar dados externos.";
    });
}


// ---------------------------
// Inicialização e eventos
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
      input.focus();
    }
  });

  // Carregar e mostrar tarefas
  mostrarTarefas();

  // Chamar a API externa
  fetchApiData();
});
