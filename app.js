const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const db = require('./db/connection')
const bodyParser = require('body-parser')
const Job = require('./models/Job')

const PORT = 3000
app.listen(PORT, function () {
  console.log(`O Express está rodando na porta ${PORT}`)
});

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))



db
  .authenticate()
  .then(() => {
    console.log('Conectou ao banco com sucesso!')
  })
  .catch(err => {
    console.log('Ocorreu um erro ao conectar', err)
  });

//routes
app.get('/', (req, res) => {
  Job.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
  }).then(jobs => {
    res.render('index', {
      jobs
    })

  })
})

// jobs routes
app.use('/jobs', require('./routes/jobs'))