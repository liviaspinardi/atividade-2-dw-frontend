const API_URL = 'https://atividade-2-dw.onrender.com/notas';

async function listarNotas() {
  const response = await fetch(API_URL);
  const notas = await response.json();
  document.getElementById('notas').innerHTML = notas.map((nota, index) => `
    <div>
      <h3>${nota.titulo}</h3>
      <p>${nota.conteudo}</p>
      <button onclick="editarNota(${index})">Editar</button>
      <button onclick="excluirNota(${index})">Excluir</button>
    </div>
  `).join('');
}

async function criarNota() {
  const titulo = document.getElementById('titulo').value;
  const conteudo = document.getElementById('conteudo').value;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, conteudo })
  });
  listarNotas();
}

listarNotas();

async function editarNota(id) {
    const novoTitulo = prompt("Novo título:", document.getElementById('titulo').value);
    const novoConteudo = prompt("Novo conteúdo:", document.getElementById('conteudo').value);
  
    if (novoTitulo === null || novoConteudo === null) return; 
  
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          titulo: novoTitulo, 
          conteudo: novoConteudo 
        })
      });
  
      if (response.ok) {
        alert("Nota atualizada!");
        listarNotas(); 
      }
    } catch (error) {
      console.error("Erro ao editar:", error);
    }
  }

async function excluirNota(id) {
    if (!confirm("Tem certeza que deseja excluir esta nota?")) return;
  
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        alert("Nota excluída!");
        listarNotas(); 
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
}

  document.getElementById('notas').innerHTML = notas.map((nota, index) => `
  <div class="nota">
    <h3>${nota.titulo}</h3>
    <p>${nota.conteudo}</p>
    <button onclick="editarNota(${index})">Editar</button>
    <button onclick="excluirNota(${index})">Excluir</button>
  </div>
`).join('');