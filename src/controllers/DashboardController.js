const Job = require("../model/Job")
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/profile')
module.exports = {
    async index(req,res){
        //agora a gente nao vai mais enviar o html pronto, ele ira passar pelo motor da engine ejs primeiro para depois ser renderizado como html puro
        // por isso agr sera usado o render
        // como o ejs ja reconhece a pasta views, não precisa usar a /, e tambem não precisa usar o .html no final
        const Jobs = await Job.get()
        const profile = await Profile.get()
        
        const statusCount = {
            progress: 0,
            done: 0,
            total: Jobs.length
        }
        let jobTotalHours = 0
        const updateJobs = Jobs.map((job) =>{
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            

            // status = done
            // statusCount[done] += 1
            //somando a quando de status
            statusCount[status] +=1
            jobTotalHours = status == 'progress'? jobTotalHours += Number(job["daily-hours"]) : jobTotalHours
            
            return {
                    /* ... job está contruindo o objeto dnv e adicionando remainin e status
                        {   
                            id: job.id
                            name: job.name,
                            'dayly-hours':job.dayly-hours,
                            "total-hours": job.total-hours,
                            created_at: job.created_at
                            remaining: remaning
                            status: stauts
                        }
        
                    */
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
    })
    //qts de horas que quero trabalhar menos a quantidade de jobs em progress
    const freeHours = Number(profile["hours-per-day"]) - jobTotalHours   
    return res.render("index",{job:updateJobs, profile, statusCount, freeHours})    
    }
}
