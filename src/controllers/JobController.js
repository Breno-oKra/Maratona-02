const Job = require('../model/Job')
const JobUtils = require("../utils/jobUtils")
const Profile = require("../model/profile")
module.exports = {
    create(req,res){
        return res.render("job")
    },
    async save(req,res){
        const jobs = await Job.get()
        const lastId = jobs[jobs.length -1]?.id || 0;

        //poderia ser feito asssim tbm
        //job.createAt = Date.now() // atribuinando data de hj
        //const job = req.body
        await Job.create({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours" : Number(req.body["daily-hours"]),
            "total-hours":  Number(req.body["total-hours"]),
            created_at: Date.now() // atribuinando data de hj em miliessegundos desde de 1977
        })
        return res.redirect("/")
    },
    async show(req,res){
        const jobId = req.params.id
        const jobs = await Job.get()
        const profile = await Profile.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))
        if(!job){
            return res.send("job not fund!!! vai arrumar logo um trabai muleke")
        }
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])
        return res.render("job-edit",{job})
    },
    async update(req,res){
        const jobId = req.params.id
        const updatedJob = {
            // mesmo espalhando tudo oque ja tinha nesse objeto com ...job, em baixo iremos sobrescrever
            name:req.body.name,
            "total-hours":req.body["total-hours"],
            "daily-hours":req.body["daily-hours"],
        }

        await Job.update(updatedJob,jobId)
        res.redirect("/job/" + jobId)
    },
    async delete(req,res){
        const jobId = req.params.id
        await Job.delete(jobId)
        return res.redirect("/")
    }
}