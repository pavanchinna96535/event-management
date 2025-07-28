
const express=require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { eventRegister, getRegistrations } = require("../controllers/registerControllers");
const router=express.Router();




router.post("/:eventId",[authenticate],eventRegister);
router.get("/my-registrations",[authenticate],getRegistrations);

module.exports=router;