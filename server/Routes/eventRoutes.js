
const express=require("express");
const { authorizeAdmin, authenticate } = require("../middleware/authMiddleware");
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require("../controllers/eventControllers");
const router=express.Router();






// users
router.get("/",getEvents);
router.get("/:id",getEventById);

// admin 
router.post("/:id",[authenticate,authorizeAdmin],createEvent);
router.put("/:id",[authenticate,authorizeAdmin],updateEvent);
router.delete("/:id",[authenticate,authorizeAdmin],deleteEvent);

module.exports=router;