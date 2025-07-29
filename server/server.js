
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const app = express();
const authRoutes=require("./Routes/authRoutes");
const eventRoutes=require("./Routes/eventRoutes");
const registrationRoutes=require("./Routes/registrationRoutes");
const stripeRoutes=require("./Routes/stripeRoutes");

app.use(cors({
    origin:"https://event-management-gules-one.vercel.app/",
    credentials:true,
}));

app.use(express.json());

// exposing routes from server
app.use("/api/auth",authRoutes);
app.use("/api/events",eventRoutes);
app.use("/api/registrations",registrationRoutes);
app.use("/api/stripe",stripeRoutes);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("db connected successfully");
}).catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
});