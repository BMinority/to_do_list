const form = document.querySelector('form');
const atividadeInput = document.querySelector('#atividade');
const dataAgendarInput = document.querySelector('#agendar-data');
const dataPrazoInput = document.querySelector('#data-prazo');
const tabela = document.querySelector('#tabela');
const tbody = tabela.querySelector('tbody');
const salvarBtn = document.querySelector('#salvar');
const cancelarBtn = document.querySelector('#cancelar');


salvarBtn.addEventListener('click', function() {

  const atividadeInput = document.querySelector('#atividade').value;
  const dataAgendarInput = document.querySelector('#agendar-data').value;
  const dataPrazoInput = document.querySelector('#data-prazo').value;

  if (atividadeInput) {

    const novaLinha = document.createElement('tr');
    const dataAgdObj = new Date(dataAgendarInput);
    const dataPrazoObj = new Date(dataPrazoInput);

    novaLinha.innerHTML = `
    <td style="color: #fffb01;">${atividadeInput}</td>
    <td style="color: #fff;">${dataAgdObj.toLocaleDateString('pt-BR')}</td>
    <td style="color: #ff7301;">${dataPrazoObj.toLocaleDateString('pt-BR')}</td>
    <td id="extrasBtn">
      <button class="editar-btn">
      <i class="fa-sharp fa-solid fa-file-pen"></i>
      </button>
      <button class="excluir-btn">
      <i class="fa-solid fa-trash"></i>
      </button>
    </td>
    `;

    tbody.appendChild(novaLinha);

    document.querySelector('#atividade').value = '';
    document.querySelector('#agendar-data').value = '';
    document.querySelector('#data-prazo').value = '';

    localStorage.setItem('agenda', JSON.stringify({
      atividadeInput,
      dataAgendarInput,
      dataPrazoInput,
    }));

  } else {
    alert('Preencha todos os campos!');
  }
});

cancelarBtn.addEventListener('click', function() {

  document.querySelector('#atividade').value = '';
  document.querySelector('#agendar-data').value = '';
  document.querySelector('#data-prazo').value = '';

});


tabela.addEventListener('click', function(event) {
  if (event.target.classList.contains('fa-file-pen')) {

    const linha = event.target.closest('tr');

    const celulas = linha.querySelectorAll('td');

    document.querySelector('#atividade').value = celulas[0].textContent;
    document.querySelector('#agendar-data').value = celulas[1].textContent;
    document.querySelector('#data-prazo').value = celulas[2].textContent;

    linha.remove();
  } else if (event.target.classList.contains('fa-trash')) {

    const linha = event.target.closest('tr');

    linha.remove();
  }
});