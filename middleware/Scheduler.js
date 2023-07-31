const schedule = require('node-schedule');
const param = require('../model/Params/param');
//const date = new Date(2012, 11, 21, 5, 30, 0);

const schedulePrice=(date,priceNewState,title)=>{
    const job = schedule.scheduleJob(
        new Date(date[0], date[1], date[2], 4, 30, 0), function(){
        param.updateOne({title:title},{$set:{paramValue:priceNewState}})
        
    });
    //console.log(new Date(date[0], date[1], date[2], 4, 30, 0))
}

module.exports = schedulePrice