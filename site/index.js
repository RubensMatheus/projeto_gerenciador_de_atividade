const express = require('express')
const app = express()
const { Atividades } = require('./models')
const path = require('path')
const indexRout = require('./rotas/index.rotas')

app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

app.use('/', indexRout)

app.get('/dados', async function(req, res) {
    const atividade = await Atividades.findAll()
    res.json({atividades: atividade})
});

// app.get('/dados/:id', async (req, res) => {
//     const atividade = await Atividades.findByPk(req.params.id)
//     res.json({atividades: atividade})
// })

app.post('/dados', async (req, res) => {
    const atividades = await Atividades.create(req.body)
    const insertedId = atividades.id;
    const atividade = await Atividades.findByPk(insertedId)
    res.json({atividades: atividade})
})

// app.delete('/dados', async (req, res) => {
//     const id = req.query.id
//     const atividade = await Atividades.findByPk(id)
//     if (atividade){
//         await atividade.destroy()
//         res.json({msg: "Atividadet deletada com sucesso!"})
//     }else{
//         res.status(400).json({msg: "Atividade não encontrado!"})
//     }
// })

app.listen(3000, function() {
  console.log('Aplicativo da web rodando na porta 3000!');
});