import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Register = () => {

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const res=await axios.post('/auth/register', values);
      if(res?.data?.success===false){
        messageApi.info("User already exists,Please login!");
        
      }
    
      message.success('Registration successful! Please log in.');
    
      
      setTimeout(()=>{
        navigate("/"); 
      },1200)
      
    } catch (err) {
      
      message.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (  
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Sign Up</h2>
      {contextHolder}
      <Form layout="vertical" onFinish={onFinish}> 
        <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name="role" label="Register As" rules={[{ required: true }]}>
          <Select placeholder="Select a role">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
