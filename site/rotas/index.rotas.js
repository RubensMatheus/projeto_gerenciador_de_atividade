const express = require('express')
const router = express.Router()
const { Atividades } = require('../models')
const moment = require('moment')

moment.locale('tp-br')

router.get('/', async (req, res) => {
    const atividade = await Atividades.findAll({
        // include: [{
        //    model: atividade
        // }], raw: true, nest: true
    })

    const atvResult = atividade.map((atv) => prepararResultado(atv))
    //console.log(atvResult)
    res.render('pages/index', {atividades: atvResult})

})

function prepararResultado(atv){

    const result = Object.assign({}, atv)
    result.novadata = moment(new Date(result.dataValues.data)).add(10, 'days').calendar()

    if (result.createdAt) delete result.createdAt
    if (result.updatedAt) delete result.updatedAt
    
    return result
}

module.exports = router