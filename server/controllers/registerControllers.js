
const Register=require("../Models/registration");
const Event=require("../Models/events");
const crypto=require("crypto");
const mongoose=require("mongoose");
const sendTicketMail=require("../sendmail");

const generateEntryCode = () => crypto.randomBytes(4).toString('hex').toUpperCase();

const eventRegister=async(req,res)=>{
    try{
        const {eventId}=req.params;
        const {formFields}=req.body;
       
        // check for valid event 
        const event=await Event.findById(eventId);

        
        if(!event){
            return res.status(404).json({message:"Event not found"});
        }

        // check for duplicate registrations 
        const alreadyRegistered = await Register.findOne({
                userId: new mongoose.Types.ObjectId(req.user.id),
                eventId: new mongoose.Types.ObjectId(eventId),
        });

        
        if(alreadyRegistered){
           
            return res.status(201).json({success:true,alreadyRegistered:true,message:"you have already registered for this event",
                registrationId:alreadyRegistered._id,
                entryCode:alreadyRegistered.entryCode,
                event:{
                    title:event.title,
                    date:event.date,
                    location:event.location
                },
                user:{
                    name:alreadyRegistered.formFields.name,
                    email:alreadyRegistered.formFields.email

                }

            });
        }
        const entryCode=generateEntryCode();
        
        const Registration=new Register({
            userId:req.user.id,
            eventId:eventId,
            formFields,
            entryCode,
            
        })

        await Registration.save();
        console.log(Registration);
        const htmlContent = `
                    <h2>🎟️ Your Event Ticket</h2>
                    <p><strong>Name:</strong> ${Registration.formFields.name}</p>
                    <p><strong>Email:</strong> ${Registration.formFields.email}</p>
                    <p><strong>Entry Code:</strong> <code>${entryCode}</code></p>
                    <p><strong>Event:</strong> ${event.title}</p>
                    <p><strong>Date:</strong> ${new Date(event.date).toDateString()}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <br />
                    <p>📌 Please keep this ticket safe and present it at the event check-in.</p>
                    `;

        sendTicketMail(
            Registration.formFields.email,
            `Your Ticket for ${event.title}`,
             htmlContent
        ).catch(console.error);
        

        return res.status(201).json({success:true,alreadyRegistered:false,message:"register successful",
            registrationId:Registration._id,
            entryCode:Registration.entryCode,
            event:{
                title:event.title,
                date:event.date,
                location:event.location
            },
            user:{
                name:Registration.formFields.name,
                email:Registration.formFields.email

            }
        })
        

    }
    catch(err){
        console.error("❌ Registration error:", err); 
        res.status(500).json({ message: 'Failed to register for event', error: err.message });
    }
}

const getRegistrations=async(req,res)=>{
    try{
        const registrations = await Register.find({ user: req.user.id })
      .populate('event')
      .sort({ createdAt: -1 });

    res.status(200).json(registrations);
    }
    catch(err){
         res.status(500).json({ message: 'Failed to fetch registrations', error: err.message });
    }
}

module.exports={eventRegister,getRegistrations}; 