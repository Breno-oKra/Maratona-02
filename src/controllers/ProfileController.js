const Profile = require("../model/profile")

module.exports = {
    async index(req,res) {
        return res.render("profile",{profile:await Profile.get()})
    },
    async update(req,res){
        const data = req.body
        //req.bosy para pegar os dados
        //quantas semanas tem no ano
        //remover as semanas de ferias
        const weeksPerYear = 52
        const weeksPerMonth = (weeksPerYear - data['vocation-per-year']) / 12
        const weekTotalHours = data['hours-per-day'] * data['days-per-week']
        //horas trabalhadas no mes
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        //qual sera o valor da minha hora
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        await Profile.update({
            ... await Profile.get(),
            ...req.body,
            'value-hour': valueHour
        })
        return res.redirect('/profile')
    }  
}