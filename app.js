const express = require('express')
const app = express()
const db = require('./db/connection')

const PORT = 3000
app.listen(PORT, function () {
  console.log(`O Express está rodando na porta ${PORT}`)
})

db
  .authenticate()
  .then(() => {
    console.log('Conectou ao banco com sucesso!')
  })
  .catch(err => {
    console.log('Ocorreu um erro ao conectar')
  });

//routes
app.get('/', (req, res) => {
  res.send('Está funcionando')
})

app.get('/testando', (req, res) => {
  res.send('Está funcionando o testando22')
})