// primeira coisa que vai chamar o banco de dados
// primeira

const { calculateBudget } = require('../utils/jobUtils')
const Database = require('./config')
// chamamos o require de config.js que é o open do sqlite

const initDb = {
    async init(){
        const db  = await Database()

        //aki vamos passar o sql
        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vocation_per_year INT,
            value_hour INT
            );
        `)
        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME

            );
        `)
        // CASO NÃO QUEIREMOS PASSAR ALGUMA INFORMAÇÃO EM UM CAMPO, BASTA SOMENTE NAO CHAMALO QUANDO MOSTRAMOS A TABELA
        await db.run(`INSERT INTO profile (
            name ,
            avatar ,
            monthly_budget,
            days_per_week ,
            hours_per_day ,
            vocation_per_year,
            value_hour
            ) VALUES (
                "Breno",
                "http://github.com/Breno-oKra.png",
                3000,
                6,
                4,
                4,
                70
            );
        `)

        await db.run(`INSERT INTO jobs (
            name ,
            daily_hours ,
            total_hours,
            created_at 
            ) VALUES (
                "DIABETES",
                2,
                1,
                1617929577485
            );
        `
        )
        await db.run(`INSERT INTO jobs (
            name ,
            daily_hours ,
            total_hours,
            created_at  
            ) VALUES (
                "brenoca",
                3,
                47,
                1617929577485
            );
        `)
        await db.close()
    }

}

initDb.init()
//
// O BANCO DE DADOS NÃO ACEITA TRAÇOS -, ENTÃO VAMOS USART ANDERLINE _
// como fucinar um codigo sqlite
//CREATE TABLE profile (name,avatar,monthly_calculateBudget,days-per-week, hours-per-day,vocation-per-year,value-hour)