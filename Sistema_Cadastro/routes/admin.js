const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

router.get('/', (req, res) => {
    res.send('Página principal')
})

router.get('/posts', (req,res) => {
    res.send("Página de posts")
})

router.get('/usuarios', (req, res) => {
    Usuario.find().lean().then((usuarios) => {
        res.render("admin/usuarios", {usuarios: usuarios})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os usuarios")
    })
    
  })

router.get('/usuarios/add', (req,res) => {
    res.render("admin/addusuarios")
})

router.get('/usuarios/edit/:id', (req,res) => {
    Usuario.findOne({_id:req.params.id}).lean().then((usuario) => {
        res.render("admin/editusuarios", {usuario: usuario})
    }).catch((err) => {
        req.flash("error_msg", "Este usuário não existe")
        res.redirect("admin/usuarios")
    })
    
})

router.post("/usuarios/edit", (req,res) => {
    Usuario.findOne({_id: req.body.id}).then((usuario) => {

        usuario.cpf = req.body.cpf
        usuario.nome = req.body.nome
        usuario.idade = req.body.idade
        usuario.email = req.body.email

        usuario.save().then(() => {
            req.flash("success_msg", "Usuário editdo com sucesso!")
            res.redirect("/admin/usuarios")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edicão do usuário")
            res.redirect("/admin/usuarios")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar o usuário")
        res.redirect("/admin/usuarios")
    })
})

router.post('/usuarios/new', (req,res) => {

    var erros = []

    if(!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null) {
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.idade || typeof req.body.idade == undefined || req.body.idade == null) {
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({texto: "Nome inválido"})
    }

    if(erros.length > 0){
        res.render("admin/addusuarios", {erros: erros})
    }

    const novoUsuario = {
        cpf: req.body.cpf,
        nome: req.body.nome,
        idade: req.body.idade,
        email: req.body.email
    }

router.post('/usuarios/deletar', (req, res) => {
    Usuario.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Usuário deletado com sucesso!")
        res.redirect("/admin/usuarios")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar o usuário")
        res.redirect("/admin/usuarios")
    })
})

    new Usuario(novoUsuario).save().then(() => {
        req.flash("success_msg", "Usuario criada com sucesso!")
        res.redirect("/admin/usuarios")
        console.log("Usuário salvo com sucesso!")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar o usuario, tente novamente! ")
        console.log("Erro ao cadastrar o usuário!")
    })
})

module.exports = router