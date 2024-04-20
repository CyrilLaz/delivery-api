const express = require('express');
const { PORT } = require('./constants/connect-config');
const app = express();

app.listen(PORT,()=>{
    `Запущено прилолжение на ${PORT}`
})