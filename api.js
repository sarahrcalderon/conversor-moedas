const path = require('path');  
const { fork } = require('child_process');  
const rotaDaApi = path.join(__dirname, 'API', 'index.js');

fork(rotaDaApi);
console.log('Servidor da API iniciado com sucesso!');
