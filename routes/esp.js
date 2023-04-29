//import {Dispositivo} from "../class/disp";

const express = require('express')
const app = express()
const client = require('../models/connection')
const client_envio = require('../models/recepcaonabd')
const {compileTrust} = require("express/lib/utils");


const espteste1 = (req,res)=>{
    res.status(200).json({"dispositivo_id": 123,"codigo_identificacao": "Hello World","estado_entrada": true,"estado_luz": true,"lugar_1": true,"lugar_2": true,"lugar_3": true,"lugar_4": true,"lugar_5": true,"lugar_6": true,"lugar_7": true,"lugar_8": true})
}

const esp_todos = (req,response) => {
    client.query('SELECT * FROM onspot.dispositivos',(error,results)=>{
        if (error) {
            throw error
        }

        response.status(200).send(results)
        //response.status(200).json(results)
    })
}

const esp_id = (request, response) => {
    const id = request.params.id
    client.query('SELECT * FROM onspot.dispositivos where codigo_identificacao = "' + id.toString() + '"', (error, results) => {
        if (error) {
            throw error
        }
        let x = JSON.stringify(results).toString()
        let a = x.substring(1,x.length - 1)
        console.log(a)
        response.status(200).send(a)
        //response.status(200).json(results)
    })
}

const esppostteste = (request, response) => {
    const dados = request.body
    console.log("esp:  " + JSON.stringify(dados))
    response.status(200).json(true)
}


const esppost = (request, response) => {
    try {
        const dados = request.body
        console.log("esp:  "+ JSON.stringify(dados))
        const up = 'UPDATE  onspot.dispositivos SET lugar_1=' + dados.lugar1.toString() + ',lugar_2=' + dados.lugar2.toString() + ',lugar_3=' + dados.lugar3.toString() + ',lugar_4=' + dados.lugar4.toString() + ',lugar_5=' + dados.lugar5.toString() + ',lugar_6=' + dados.lugar6.toString() + ' where codigo_identificacao = "' + dados.codigo.toString() + '" ';
        console.log(up)
        client_envio.query(up, (error, results) => {

            if (error) {throw error}
            response.status(200).json(results)

        })
    }

    catch (e) {
        console.log(e);
        response.status(200).json("error")
    }
    finally {
        console.log("success");
    }
}



module.exports = {
    espteste1,
    esppost,
    esp_todos,
    esp_id,



}