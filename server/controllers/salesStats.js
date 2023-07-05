import OverallStat from "../models/OverallStats.js"
import Product from "../models/Product.js"
import ProductStat from "../models/ProductState.js"
import AffiliateStat from "../models/Stats.js"
import Transaction from "../models/Transaction.js"
import User from "../models/User.js"

export const getOverAllStats = async(req,res)=>{
    try{
        const stats =await OverallStat.find()
         res.json(stats)}catch(err){
        res.json({error:"Failed to Retrieve the Data"})
    }
}
export const getAllClients = async(req,res)=>{
            try{
            const users = await AffiliateStat.find().populate("userId").populate("affiliateSales")
                res.json(users)
            }catch(err){
                res.json({error:"couldnt retrieve Data"})
            }
}
export const productStats = async(req,res)=>{
                    try{const categoris = await Product.distinct("category")
                    res.json(categoris)}catch(err){
                        res.json({message:"tahche"})
                    }
}
export const getProducts =async (req,res)=>{
        try{
                const products = await ProductStat.find().populate("productId")
                res.json(products)
        }catch(err){
            res.json(err)
        }

}
export const getUsers =async (req,res)=>{
    try{
            const users = await User.find()
            res.json(users)
    }catch(err){
        res.json(err)
    }

}
export const getTransactions =async (req,res)=>{
    try{
            const transactions = await Transaction.find()
            res.json(transactions)
    }catch(err){
        res.json(err)
    }

}

