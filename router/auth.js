const express =require('express')

const router =express.Router();

const jwt=require('jsonwebtoken')

require('../db/conn');

const User=require('../models/schema');


const authenticate = require('../middleware/authenticate');


router.get('/api',(req,res)=>{
    res.send(`hello world again`);
})


router.post('/api/register',async (req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(422).json({error:"plz fill the field properly"});
    }

    try {
        const response=await User.findOne({email:email});
        if(response){
            return res.status(422).json({error:"Email already exist"});
        }
        else{
            const user =new User(req.body);

            const userRegister = await user.save();

            if(userRegister){
                res.status(201).json({message: "user registered succesfully"})
            }
        }
        
    } catch (error) {
        console.log(error);

    }
    console.log(req.body);
})



router.post('/api/signin',async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Fill the data properly"});
        }

        const userLogin=await User.findOne({email:email});


        if(userLogin){
            const isMatch=userLogin.password;

            const token = await userLogin.generateAuthTokon();


            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
            console.log(token);


            if(password===isMatch){
                res.json({message:"user sigin successfully"});
            }
            else{
                res.status(400).json({error:"Invalid Credentials"});
            }
        }
        else{
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        
    }
})


router.get('/api/about',authenticate,(req,res)=>{
   console.log("hello my about");
   res.send(req.rootUser);
});


router.get('/api/getdata',authenticate,(req,res)=>{
    console.log("get data call");
    res.send(req.rootUser);
})

router.get('/api/logout',(req,res)=>{
    console.log("LOGOUT");
    
    res.clearCookie("jwtoken");
   
    res.status(200).send({message:"User Logout"});
})


module.exports=router;