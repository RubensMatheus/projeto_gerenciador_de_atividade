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

app.post('/dados', async (req, res) => {
    //console.log(req.body)
    const atividades = await Atividades.create(req.body)
    //console.log(atividades)
    res.json({atividades: atividades})
})

app.delete('/dados', async (req, res) => {
    const id = req.body.id
    console.log(id)
    const atividades = await Atividades.findByPk(id)
    if (atividades){
        await atividades.destroy()
        res.json({msg: "Atividadet deletada com sucesso!"})
    }else{
        res.status(400).json({msg: "Atividade não encontrado!"})
    }
})

app.listen(3000, function() {
  console.log('Aplicativo da web rodando na porta 3000!');
});