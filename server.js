const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json())

mongoose.connect('mongodb+srv://www-chipleki:Kp6LGRV4t7AUBfXV@cluster0.5pgu7.mongodb.net/fukusuke', {useNewUrlParser: true, useUnifiedTopology: true});

app.use('/', require('./routes/userRoute'));

app.listen(8080, function(){
    console.log("Servidor Iniciado");
});


