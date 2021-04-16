const express = require("express")
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require("./controllers/JobController")
const DashboradController = require("./controllers/DashboardController")
// o ejs ja reconhece a pasta view por padrao entrão não precisa mais dessa constante, se a pasta fosse outro nome ai precisaria
// poren como a pasta views esta dentro do src/ o ejs não ira encontra, so iria encontrar se estivesse na raiz, ex: dentro da pasta maratona-discovery-02-1.0.0
//const views = __dirname + "/views/"

   
//req, res
//ativado quando entrarmos em /, ou seja o inicio
routes.get('/',DashboradController.index)

routes.get('/index',(req,res) => {return res.redirect("/")})
routes.get('/job/:id',JobController.show)
routes.post('/job/:id',JobController.update)
routes.post('/job/delete/:id',JobController.delete)
routes.get('/job',JobController.create)

routes.post('/job',JobController.save)

routes.get('/profile',ProfileController.index)
routes.post('/profile',ProfileController.update)

module.exports = routes