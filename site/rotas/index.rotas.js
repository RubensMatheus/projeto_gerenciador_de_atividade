const express = require('express')
const router = express.Router()
const { Atividades } = require('../models')
const moment = require('moment')

moment.locale('tp-br')

router.get('/', async (req, res) => {
    const atividade = await Atividades.findAll({})

    const atvResult = atividade.map((atv) => prepararResultado(atv))
    //console.log(atvResult)
    res.render('pages/index', {atividades: atvResult})

})

function prepararResultado(atv){

    const result = Object.assign({}, atv)
    result.novadata = moment(new Date(result.dataValues.data)).format('L')

    if (result.dataValues.createdAt) delete result.dataValues.createdAt
    if (result.dataValues.updatedAt) delete result.dataValues.updatedAt
    
    return result
}

module.exports = router