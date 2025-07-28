import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "../api/axiosInstance"
import { useParams } from "react-router-dom";
import Ticket from "./ticket";

function EventRegistration(){
    const {id}=useParams();
    
    const [form] = Form.useForm();
    const [ticket,setTicket]=useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish=async(values)=>{
        try{
            const token=localStorage.getItem('token');
            const res=await axios.post(`/registrations/${id}`,
                {
                    formFields:values,
                },
                {
                    headers:{
                        authorization:`Bearer ${token}`,
                    }
                }
                
            )
            setTicket(res.data);
            
            if(res.data?.alreadyRegistered){
              messageApi.info("Already registered for this event!");
            }
            
            
        }
        catch(err){
          
            message.error(
              err.response?.data?.message || "Failed to register for event"
            );
        }
    }

    return(
    
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Event Registration</h2>
      {contextHolder}
      {!ticket?
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ name: "", email: "", phone: "" }}
         >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email address" },
          ]}
        >
          <Input placeholder="john@example.com" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter your phone number" }]}
        >
          <Input placeholder="+91 9876543210" />
        </Form.Item>

        {/* Add more form fields as needed here */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register for Event
          </Button>
        </Form.Item>
      </Form>
      :
      <Ticket data={ticket} />
     }
    </div>
  );
}

export default EventRegistration;