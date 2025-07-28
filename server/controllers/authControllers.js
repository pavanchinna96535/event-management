
const User=require("../Models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const register=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(201).json({success:false,message:"user already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({name,email,password:hashedPassword,role});
        return res.status(200).json({success:true,message:"user registered successfully"});

    }
    catch(err){
       return  res.status(500).json({message:"server error"});
    }

}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET, { expiresIn: '1d' });
        // retyurn the token along with user credentisals to the frontend for future use
        return res.status(200).json({token,user:{id:user._id,name:user.name,role:user.role},message:"Logged in successfully"})
    }
    catch(err){
        return res.status(500).json({message:"server error"});
    }
    
}
module.exports={register,login};