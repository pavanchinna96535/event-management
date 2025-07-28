
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import AddEvent from './pages/addEvent';
import EventDetail from './pages/eventDetail';
import EventRegistration from './pages/eventRegistration';
import EventEdit from './pages/eventEdit';
import Navbar from './pages/navbar';

function App() {
  
  return (
    <>
   
    <Router>
      
      <Routes>
        <Route element={<Navbar />}>
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/event-detail/:id" element={<EventDetail />}/>
        <Route path="/event-registration/:id" element={<EventRegistration />}/>
        <Route path="/event-edit/:id" element={<EventEdit/>}/>
        </Route>

        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        
      </Routes>
    </Router>
    </>
  );
}

export default App;

