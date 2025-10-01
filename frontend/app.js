console.log("app.js funcionando");

const API = 'http://localhost:3000/alunos'

async function carregarAluno() {
  if(!id){
    alert("Nenhum aluno selecionasdo para a edição!");
    return;
  }
  const resposta = await fetch(`${API}/${ID}`)
  const ALUNO = await resposta.json();
  console.log(ALUNO)

  document.getElementById("nome").value = ALUNO[0].nome
  document.getElementById("cpf").value = ALUNO[1].cpf

}
async function carregarTabela() {

  try {
    const resposta = await fetch(API)
    const ALUNOS = await resposta.json()
    console.log(ALUNOS)

    const tbody = document.getElementById("tbody")

    tbody.innerHTML = "<tr><td colspan='10'>Carregando...</td></tr>"
    tbody.innerHTML = "";
    tbody.innerHTML = ALUNOS.map(a =>
      `<tr>
                <td>${a.id}</td>
                <td>${a.nome}</td>
                <td>${a.cpf}</td>
                <td>${a.cep}</td>
                <td>${a.uf}</td>
                <td>${a.rua} senai</td>
                <td>${a.numero}</td>
                <td>${a.complemento}</td>
                <td> 
                  <button>
                      <a href="editar.html?id=${a.id}">Editar</a>
                  </button> 
                <button onclick="excluirAluno(${a.id})" >
                    Excluir
                </button>
                </td>
            </tr>`
    ).join("");


  } catch (error) {
    console.error(error.message)


  }
}

async function excluirAluno(id) {
  if (!confirm("Tem certeza que deseja excluir?")) return;
  try {
    const resposta = await fetch(`http://localhost:3000/alunos/${id}`, {
      method: "DELETE"
    });

    if (!resposta.ok) {
      alert("Erro ao tentar excluir o aluno!");
      return;
    }

    const retorno = await resposta.json();
    alert(retorno.msg);
    carregarTabela();
  } catch (error) {
    console.error(error.message);
  }
}
carregarTabela();