const turmaOptions = [
    "1EMCB1", "1EMCB2", "1EMCA", "1EMCC", "2EMCB", "6ºAno", "7ºAno", "8ºAno", "9ºAno"
];

const disciplinaOptions = [
    "Fund. Informática e SO", "Lógica de Programação", "Introdução a Web", 
    "Rede de Computadores e Hardwares", "Comport. Organizacional e Liderança", 
    "Modelagem de Sistema", "Projeto Integrador", "Programação WEB", 
    "Banco de Dados", "Prog Orientada a Objetos", "Design Digital", 
    "Educação Digital"
];

document.addEventListener("DOMContentLoaded", () => {
    const formSections = document.getElementById("form-sections");
    for (let i = 1; i <= 9; i++) {
        formSections.innerHTML += createAulaSection(i);
    }
});

// Função para criar cada seção de aula com menu de seleção de turma e ocorrência
function createAulaSection(index) {
    return `
    <div class="turma-section" id="section_Aula_${index}">
        <h2>Aula ${index}</h2>
        <label>Turma:</label>
        <select name="turma_Aula_${index}" id="turma_Aula_${index}">
            ${turmaOptions.map(turma => `<option value="${turma}">${turma}</option>`).join('')}
        </select>

        <label>Disciplina:</label>
        <select name="disciplina_Aula_${index}" id="disciplina_Aula_${index}">
            ${disciplinaOptions.map(disciplina => `<option value="${disciplina}">${disciplina}</option>`).join('')}
        </select>

        <label>Data:</label>
        <input type="date" name="data_Aula_${index}" id="data_Aula_${index}" required>

        <label>Observações:</label>
        <textarea name="observacoes_Aula_${index}" id="observacoes_Aula_${index}" rows="2" placeholder="Escreva observações..."></textarea>

        <label>Ocorrência:</label>
        <textarea name="ocorrencia_Aula_${index}" id="ocorrencia_Aula_${index}" rows="2" placeholder="Descreva a ocorrência"></textarea>

        <label>Confirmação:</label>
        <div class="switch">
            <input type="checkbox" id="confirmacao_Aula_${index}" name="confirmacao_Aula_${index}" onclick="toggleConfirm(${index})">
            <label for="confirmacao_Aula_${index}" class="slider"></label>
        </div>
    </div>`;
}

// Função para alternar confirmação e alterar cor da caixa
function toggleConfirm(index) {
    const section = document.getElementById(`section_Aula_${index}`);
    section.classList.toggle("confirmed", document.getElementById(`confirmacao_Aula_${index}`).checked);
}

// Função para salvar todos os dados no LocalStorage
function saveAllData() {
    const data = {};
    for (let i = 1; i <= 9; i++) {
        const aulaData = {
            turma: document.getElementById(`turma_Aula_${i}`).value,
            disciplina: document.getElementById(`disciplina_Aula_${i}`).value,
            data: document.getElementById(`data_Aula_${i}`).value,
            observacoes: document.getElementById(`observacoes_Aula_${i}`).value,
            ocorrencia: document.getElementById(`ocorrencia_Aula_${i}`).value,
            confirmacao: document.getElementById(`confirmacao_Aula_${i}`).checked
        };
        data[`Aula ${i}`] = aulaData;
    }
    localStorage.setItem('aulaData', JSON.stringify(data));
    alert('Dados salvos com sucesso!');
}

// Função para carregar todos os dados do LocalStorage
function loadAllData() {
    const data = JSON.parse(localStorage.getItem('aulaData'));
    if (data) {
        for (let i = 1; i <= 9; i++) {
            if (data[`Aula ${i}`]) {
                document.getElementById(`turma_Aula_${i}`).value = data[`Aula ${i}`].turma;
                document.getElementById(`disciplina_Aula_${i}`).value = data[`Aula ${i}`].disciplina;
                document.getElementById(`data_Aula_${i}`).value = data[`Aula ${i}`].data;
                document.getElementById(`observacoes_Aula_${i}`).value = data[`Aula ${i}`].observacoes;
                document.getElementById(`ocorrencia_Aula_${i}`).value = data[`Aula ${i}`].ocorrencia;
                document.getElementById(`confirmacao_Aula_${i}`).checked = data[`Aula ${i}`].confirmacao;
                toggleConfirm(i); // função que altera a cor da caixa
            }
        }
        alert('Dados carregados com sucesso!');
    } else {
        alert('Nenhum dado salvo encontrado.');
    }
}

// Função para gerar relatório em texto, incluindo ocorrências
function generateTextReport() {
    let report = "Relatório de Aulas:\n\n";
    for (let i = 1; i <= 9; i++) {
        report += `Aula ${i}:\n`;
        report += `Turma: ${document.getElementById(`turma_Aula_${i}`).value}\n`;
        report += `Disciplina: ${document.getElementById(`disciplina_Aula_${i}`).value}\n`;
        report += `Data: ${document.getElementById(`data_Aula_${i}`).value}\n`;
        report += `Observações: ${document.getElementById(`observacoes_Aula_${i}`).value}\n`;
        report += `Ocorrência: ${document.getElementById(`ocorrencia_Aula_${i}`).value}\n`;
        report += `Confirmada: ${document.getElementById(`confirmacao_Aula_${i}`).checked ? 'Sim' : 'Não'}\n\n`;
    }

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Relatorio_de_Aulas.txt';
    a.click();
    URL.revokeObjectURL(url);
}

