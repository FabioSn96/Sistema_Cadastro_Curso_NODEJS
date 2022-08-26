const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Usuario = new Schema({
    cpf: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    },
})

mongoose.model("usuarios", Usuario)