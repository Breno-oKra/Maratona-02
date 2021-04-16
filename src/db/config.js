const sqlite3 = require("sqlite3")
//so vamos usar o open do sqlite
const {open} = require("sqlite")

//configurar conexão com banco de dados usamos o open

//temos que passar o filename e o driver
// o sqlite precisa esta numa estrutura assim (){} para funcionar
// no caso ele tem que esta dentro das chaves (){ sqlite }
// então para exportar vamos usar essa estrutura como arrowfunction
// quando so tem um item, o arrow function ão precisa das chaves
module.exports = () => 
    open({
    filename: "./database.sqlite",
    driver: sqlite3.Database
    })


