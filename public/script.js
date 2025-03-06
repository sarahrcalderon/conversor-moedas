document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('form-conversao')
    .addEventListener('submit', async function (event) {
      event.preventDefault();

      const de = document.getElementById('moeda-de').value;
      const para = document.getElementById('moeda-para').value;
      const quantidade = document.getElementById('quantidade').value;

      if (!de || !para || !quantidade) {
        alert('Por favor, preencha todos os campos!');
        return;
      }

      try {
        const resposta = await fetch(
          `http://localhost:3000/converter?de=${de}&para=${para}&quantidade=${quantidade}`,
        );
        const dados = await resposta.json();

        if (dados.erro) {
          throw new Error(dados.erro);
        }

        const resultadoElemento = document.getElementById(
          'resultado-conversao',
        );
        resultadoElemento.innerText = `${quantidade} ${de} = ${dados.quantidadeConvertida} ${para} (Taxa: ${dados.taxa})`;
        resultadoElemento.style.display = 'block';

        document.getElementById('msg-erro').style.display = 'none';
      } catch (erro) {
        const erroElemento = document.getElementById('msg-erro');
        erroElemento.innerText = 'Erro ao buscar a conversão.';
        erroElemento.style.display = 'block';
        document.getElementById('resultado-conversao').style.display = 'none';
      }
    });
});
