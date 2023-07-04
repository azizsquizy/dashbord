import OverallStat from "../models/OverallStats.js"

export const getOverAllStats = async(req,res)=>{
    try{
        const stats =await OverallStat.find()
         res.json(stats)}catch(err){
        res.json({error:"Failed to Retrieve the Data"})
    }
}
