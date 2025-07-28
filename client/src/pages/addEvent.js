
import React from 'react';
import { Form, Input, Button, DatePicker, InputNumber, message } from 'antd';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const AddEvent = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const onFinish = async (values) => {
    try {
      // Format date to ISO string
      const eventData = {
        ...values,
        date: values.date.toISOString(),
      };

      await axios.post(`/events/${user.id}`, eventData);
      message.success('Event added successfully');
      navigate('/dashboard');
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to add event');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Add New Event</h2>
      <Form layout="vertical" onFinish={onFinish}>
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
            Add Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEvent;
