require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORTA = 3000;
const CHAVE_API = process.env.API_KEY;
const URL_BASE = process.env.BASE_URL;

app.get('/converter', async (req, res) => {
  let { de, para, quantidade } = req.query;

  if (!de || !para || !quantidade) {
    return res.status(400).json({
      erro: 'Parâmetros "de", "para" e "quantidade" são obrigatórios.',
    });
  }

  quantidade = parseFloat(quantidade);

  if (isNaN(quantidade) || quantidade <= 0) {
    return res
      .status(400)
      .json({ erro: 'A quantidade deve ser um número válido maior que zero.' });
  }

  try {
    const resposta = await axios.get(
      `${URL_BASE}/${CHAVE_API}/pair/${de}/${para}`,
    );
    const taxa = resposta.data.conversion_rate;
    const quantidadeConvertida = (quantidade * taxa).toFixed(2);

    res.json({ de, para, quantidade, quantidadeConvertida, taxa });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar taxa de câmbio.' });
  }
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
