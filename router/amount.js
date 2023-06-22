const express = require('express')
const authenticate =require('../middleware/authenticate')
const router = express.Router();

require('../db/conn');

const Expense = require('../models/amountschema');
const User=require('../models/schema');
const { default: mongoose } = require('mongoose');




router.get('/api/getexpenses', authenticate ,async (req,res)=>{
    const user_id = req.rootUser._id.toString();
   try {
     
       const expenses = await Expense.find({user_id}).sort({createdAt:-1})
     res.status(200).json(expenses)
   } catch (error) {
    console.log(error);
   }
})




router.post('/api/postexpense', async (req,res)=>{
    const {status,cost,category,user_id}=req.body;

    try {
        
       
        const expense = await Expense.create({status,cost,category,user_id})
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({error:error.message})
        console.log(error);
    }
})





router.delete('/api/delete/:id',async (req,res)=>{
   try {
       const { id } = req.params

       if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error:"NOT VALID ID"})
       }

       const expense = await Expense.findOneAndDelete({_id:id})

       if(!expense){
        res.status(404).json({error:"no such transaction"})
       }
       res.status(200).json(expense);


   } catch (error) {
    console.log(error);
   }
})








module.exports = router;