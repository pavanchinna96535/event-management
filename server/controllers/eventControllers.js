
const Event=require("../Models/events");


const getEvents=async(req,res)=>{
    try{
        const events=await Event.find().sort({date:1});
        return res.status(200).json(events);
    }
    catch(err){
        return res.status(500).json({message:"server error"});
    }
}

const getEventById=async(req,res)=>{
    try{
        const event=await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({message:"Event not found"});
        }
        return res.status(200).json(event);
    }
    catch(err){
         return res.status(500).json({message:"server error"});
    }
}

const createEvent=async(req,res)=>{
    try{
        const userId=req.params.id;
        console.log(userId);
        const newEvent=new Event({...req.body,userId});
        console.log(newEvent);
        await newEvent.save();
        
        return res.status(200).json({message:"Event added successfully"});
    }
    catch(err){
        return res.status(400).json({message:"Invalid data",error:err.message});
    }
}

const updateEvent=async(req,res)=>{
    try{
        const {id}=req.params;
        const event=await Event.findByIdAndUpdate(id,req.body);
        if(!event){
            return res.status(400).json({message:"Event not found"});
        }
        return res.status(201).json(event);
    }
    catch(err){
        return res.status(400).json({message:"update failed",error:err.message});
    }
}

const deleteEvent=async(req,res)=>{
    try{
        console.log(req.params.id);
        const event=await Event.findByIdAndDelete(req.params.id);
        
        if(!event){
            return res.status(400).json({message:"Event not found"});
        }
        return res.status(201).json({message:"Event deleted successfully"});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

module.exports={getEvents,getEventById,createEvent,updateEvent,deleteEvent};