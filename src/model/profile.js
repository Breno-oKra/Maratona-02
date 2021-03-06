const Database = require("../db/config")

module.exports = {
    async get(){
        const db = await Database()
        //SELECT name FROM profile para pegar um campo da tabela
        // SELECT * FROM profile para pegar todos
        const data = await db.get(`
            SELECT * FROM profile
        `)

        await db.close()

        return {
            name : data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vocation-per-year": data.vocation_per_year,
            "value-hour": data.value_hour
        }
        
    },
    async update(newData){
        const db = await Database()
        //UPDATE profile SET  name = mayk se fosse alterar um campo
        db.run(`UPDATE profile SET  
            name = "${newData.name}",
            avatar = "${newData.avatar}" ,
            "monthly_budget" = ${newData["monthly-budget"]},
            "days_per_week"= ${newData["days-per-week"]} ,
            "hours_per_day" = ${newData["hours-per-day"]},
            "vocation_per_year" = ${newData["vocation-per-year"]},
            "value_hour" = ${newData["value-hour"]}
        `)
        await db.close()

    }
}