
import React, { useEffect, useState } from 'react';
import { Button, List, Typography, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const { Title } = Typography;

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('/events?limit=5&sort=date') // example API call for upcoming events
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        message.error('Failed to load events');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <Title level={2}>Welcome to Malnad Tuskers!</Title>
      <Button type="primary" onClick={() => navigate('/login')} style={{ marginRight: 10 }}>
        Login
      </Button>
      <Button onClick={() => navigate('/register')}>Register</Button>

      <Title level={3} style={{ marginTop: 40 }}>Upcoming Events</Title>

      {loading ? (
        <Spin tip="Loading events..." />
      ) : (
        <List
          bordered
          dataSource={events}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={new Date(item.date).toLocaleString()}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Home;
