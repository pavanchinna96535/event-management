import { useEffect, useState} from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { message,Space,Card, Button } from "antd";
import axios from "../api/axiosInstance";

function EventDetail(){
    const {id}=useParams();
    
    const [event,setEvent]=useState([]);
    const navigate=useNavigate();
    const [UsereId,setUserId]=useState();
    const user=JSON.parse(localStorage.getItem("user"));
    

    useEffect(()=>{

        const fetchEvent=async()=>{
            try{
                const res=await axios.get(`events/${id}`);
                
                setUserId(res.data.userId);
                setEvent(res.data);
            }
            catch(error){
                message.error('Failed to load event');
            }
           
        }
        
        fetchEvent();
       
    },[id]);

    const handleDelete=async()=>{
        try{
            const res=await axios.delete(`/events/${id}`);
            console.log(res);
        }
        catch(error){
            message.error("Failed to delete");
        }
        
        navigate("/dashboard");
    }
    
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-blue-100">
              
                    <Space  direction="vertical" size={16}>
                        <Card  title={event.title}  style={{ width: 1000 }} extra={<small>{new Date(event.createdAt).toLocaleDateString()}</small>}>
                            <p>{new Date(event.date).toLocaleDateString()}</p>
                            <p>Fee: ₹{event.fee}</p>
                            <p>Location:"{event.location}"</p>
                            <p>{event.description}</p>
                        </Card>
                    </Space> 
                    {
                        UsereId?.toString() !== user.id?
                        (   
                            
                            <Button className="mt-16" type="primary" onClick={()=>navigate(`/event-registration/${event._id}`)}>
                                Register
                            </Button>
                        ):(
                            <div className="space-x-8">
                                    <Button className="mt-16" type="primary" onClick={()=>navigate(`/event-edit/${event._id}`,{state:{event}})}>
                                        Edit
                                    </Button>
                                    <Button className="mt-16" danger onClick={()=>handleDelete()}>
                                        Delete
                                    </Button>
                           
                           </div>

                        ) 
                        
                        
                        
                    }
                    
        </div>
    )
};

export default EventDetail;