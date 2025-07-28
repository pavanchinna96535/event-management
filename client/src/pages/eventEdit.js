
import { Form, Input, Button, DatePicker, InputNumber, message } from 'antd';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import moment from 'moment';
import { useEffect } from 'react';

function EventEdit(){
    const {state}=useLocation();
    const event=state?.event;
    console.log(event);
    const [form] = Form.useForm();
    const navigate=useNavigate();

    useEffect(()=>{
        if(event){
            form.setFieldsValue({
                title:event.title,
                description:event.description,
                date:moment(event.date),
                location:event.location,
                fee:event.fee,
            });
        }
    },[event,form]);
    
    const onFinish=async(values)=>{
        try{
            const eventData = {
                ...values,
                date: values.date.toISOString(),
            };
            await axios.put(`/events/${event._id}`,eventData);
            message.success('Event added successfully');
            navigate('/dashboard');
        }
        catch(error){
            message.error("Failed to update");
        }
        
    }
    return(
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
              <h2>Add New Event</h2>
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: 'Please input event title!' }]}
                >
                  <Input />
                </Form.Item>
        
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please input event description!' }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
        
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[{ required: true, message: 'Please select event date!' }]}
                >
                  <DatePicker showTime disabledDate={(current) => current && current < moment().startOf('day')} />
                </Form.Item>
        
                <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true, message: 'Please enter the event location' }]}
                >
                <Input placeholder="Enter location" />
                </Form.Item>
        
                <Form.Item
                  label="Fee (₹)"
                  name="fee"
                  rules={[{ required: true, message: 'Please input event fee!' }]}
                >
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
        
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Update Event
                  </Button>
                </Form.Item>
              </Form>
            </div>
    );
}

export default EventEdit;