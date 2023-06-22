const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');


const schema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

schema.methods.generateAuthTokon= async function(){
    try {
        let createdtoken=jwt.sign({_id:this._id},process.env.KEY);
        this.tokens=this.tokens.concat({token:createdtoken});
        await this.save();
        return createdtoken;
    } catch (error) {
        console.log(error);
    }
} 


const User=mongoose.model('USER',schema);

module.exports=User;