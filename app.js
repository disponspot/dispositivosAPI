const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const esp = require('./routes/esp')
app.get('/esp/teste',esp.espteste1)
//app.post('/esppost/teste',esp.esppost)
app.get('/esp',esp.esp_todos)
app.get('/esp/:id',esp.esp_id)
app.post('/esppost',esp.esppost)

module.exports = app;