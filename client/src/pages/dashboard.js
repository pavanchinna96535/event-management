
import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Button, List, Card, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/events');
        setEvents(res.data);
      } catch (err) {
        message.error('Failed to load events');
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = () => {
    navigate("/add-event"); // You will build this page later
  };

  const handleLogout=()=>{
    navigate("/");
  }

  return (
    
    <div  style={{ display:"flex",  width: '100vw', height:'100vh',overflow:"auto",margin: '0 auto', padding: 20 ,backgroundColor: "bisque", justifyContent:"center",
        
     }}>
      <div className='m-8'>
      <h1 className='my-2'>Welcome, {user.name}!</h1>

      {user.role === 'admin' && (
        <Button type="primary" onClick={handleAddEvent} style={{ marginBottom: 20 }}>
          Add New Event
        </Button>
      )}

      <h1 className='my-6'>Upcoming Events!</h1>

      <List
        grid={{ gutter: 16, 
          xs: 1,  
          sm: 2,   
          md: 3,
         }}
        dataSource={events}
        renderItem={(event) => (
          <List.Item>
            <Card  
            
            title={<Link to={`/event-detail/${event._id}`}>{event.title}</Link>}
            >
              {/* <h3 onClick={()=>navigate(`/event-detail/${event._id}`)}  className="cursor-pointer hover:underline text-lg font-semibold">{event.title}</h3> */}
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>Fee: ₹{event.fee}</p>

              
            </Card>
          </List.Item>
        )}
      />
       <Button type='primary' onClick={handleLogout} style={{ marginBottom: 20 }}>Logout</Button>
       </div>
    </div>
     
  );
};

export default Dashboard;
