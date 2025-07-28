

const mongoose=require("mongoose");

const registrationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:"user",
        required:true
    },
    eventId:{
         type:mongoose.Schema.Types.ObjectId,ref:"event",
         required:true
    },
    formFields:{
        type:Object
    },
    entryCode:{
        type:String
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('registration', registrationSchema);