console.log("Funcionando");



const urlParametro = new URLSearchParams(window.location.search)
const id = urlParametro.get("id")

console.log("ID do aluno para editar", id)

const inputID = document.getElementById("id")
inputID.value = id;

const API = 'http://localhost:3000/alunos'

async function carregarAluno() {
    const resposta = await fetch(`${API}/${id}`)
    if (!resposta.ok) {
        throw new Error("Aluno não encontrado")
    }
    const ALUNO = await resposta.json();
    console.log(ALUNO)
    document.getElementById("nome").value = ALUNO.nome
    document.getElementById("cpf").value = ALUNO.cpf
    document.getElementById("cep").value = ALUNO.cep
    document.getElementById("uf").value = ALUNO.uf
    document.getElementById("rua").value = ALUNO.rua
    document.getElementById("numero").value = ALUNO.numero
    document.getElementById("complemento").value = ALUNO.complemento
}

async function salvarAluno() {
    const aluno = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        cep: document.getElementById("cep").value,
        uf: document.getElementById("uf").value,
        rua: document.getElementById("rua").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value
    };

    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno)
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            alert(erro.msg || "Erro ao atualizar aluno");
            return;
        }

        const atualizado = await resposta.json();
        alert(`Aluno ${atualizado.nome} atualizado com sucesso!`);
        window.location.href = "index.html"; // volta pra lista
    } catch (error) {
        console.error(error.message);
        alert("Erro ao atualizar aluno");
    }
}


carregarAluno()