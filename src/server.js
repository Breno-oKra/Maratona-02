const express = require("express")
const routes = require("./routes")
const server = express()
const path = require("path")


//como padrão seria chamar o ejs pelo require poren o prorio express ja tras uma função para chamar uma engine

//setando uma informação
// o exprees ja tem uma ideia de templage engine e é chamado de view engine
// depois so chamar nossa engine no caso ejs
server.set("view engine","ejs")

//Mudar a localização da pasta views
//primeiro pegamos a pasta que queremos
//path.join() esta juntando o __dirname + o views
//agora o server ira itentificar a pasta views dentro de src pois o proprio server está dentro de src en~tao o src ira para o dirname deste aquivo,
//e agora não precisa mais falasr que views está dentro de src como na constante de routes  ////const views = __dirname + "/views/"
server.set('views',path.join(__dirname,'views'))


//arquivos publicos, não esta sendo modificado toda hora, exemplo images,css,script
// não funciona para mapear rota
server.use(express.static("public"))

//para liberar o req body(contem as informações via post)
//extends true siginifica que estamos habilitando o req body
server.use(express.urlencoded({extended: true}))
server.use(routes)

server.listen(3000,() => {console.log("O server esta rodando cachorro")})