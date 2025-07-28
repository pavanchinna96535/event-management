
import React from "react";
import { Card, Typography, Divider, QRCode } from "antd";

const { Title, Text } = Typography;

const Ticket = ({ data }) => {
  const { registrationId, entryCode, user, event } = data;

  return (
    <Card
      bordered={true}
      style={{ maxWidth: 600, margin: "2rem auto", borderRadius: "10px" }}
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>🎟️ Your Event Ticket</span>
          <QRCode value={entryCode} size={64} />
        </div>
      }
    >
         
      <Title level={4}>Registrant Details</Title>
      <Text strong>Name:</Text> <Text>{user.name}</Text> <br />
      <Text strong>Email:</Text> <Text>{user.email}</Text> <br />

      <Divider />

      <Title level={4}>Event Details</Title>
      <Text strong>Event:</Text> <Text>{event.title}</Text> <br />
      <Text strong>Date:</Text> <Text>{new Date(event.date).toDateString()}</Text> <br />
      <Text strong>Location:</Text> <Text>{event.location}</Text> <br />

      <Divider />

      <Title level={4}>Registration Info</Title>
      <Text strong>Entry Code:</Text> <Text code>{entryCode}</Text> <br />
      <Text strong>Registration ID:</Text> <Text>{registrationId}</Text>

      <Divider />

      
      
    </Card>
  );
};

export default Ticket;
