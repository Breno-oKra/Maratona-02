module.exports = {
    remainingDays(job){
        console.log(job)
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDate = createdDate.setDate(dueDay)
        const timeDiffInms = dueDate - Date.now()
        //transformar milissegundos em dias
        // 1000 * 60 é 60 segundos
        //1000 * 60 * 60 é 60 minutos
        //1000 * 60 * 60 * 24 é 24 horas
        const daysInMs = 1000 * 60 * 60 * 24


        const dayDiff = Math.floor(timeDiffInms/daysInMs)
        console.log(timeDiffInms)
        return dayDiff
        
    },
    calculateBudget: (job,valueHour) => valueHour * job["total-hours"],
}